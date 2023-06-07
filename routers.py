from fastapi import UploadFile, File, APIRouter, HTTPException,  status
from operations import compress_file, decompress_file
from fastapi.responses import StreamingResponse


router=APIRouter()

compress_file_by_compressor=False
file_name:str
@router.post("/compress")
async def compress(upload_file: UploadFile = File(...)):
    global file_name
    file_name=upload_file.filename
    file_path = f"temp/{upload_file.filename}"
    with open(file_path, "wb") as temp_file:
        temp_file.write(await upload_file.read())

    compressed_file_path = compress_file(file_path)
    def iterate_file():
        with open(compressed_file_path, "rb") as file:
            while True:
                chunk=file.read(8192)
                if not chunk:
                    break
                yield chunk
    headers = {
        'Content-Disposition': f'attachment; filename="{upload_file.filename}.compressed"'
    }
    global compress_file_by_compressor
    if not compress_file_by_compressor:
        compress_file_by_compressor=True
    # Return the compressed file as a downloadable response
    return StreamingResponse(iterate_file(), media_type="application/octet-stream", headers=headers)


@router.post("/decompress")
async def decompress(upload_file: UploadFile = File(...)):
    global compress_file_by_compressor
    if not compress_file_by_compressor:
        raise HTTPException(status_code=status.HTTP_412_PRECONDITION_FAILED,detail="Initially the file should be compressed using above compressor API")
    file_path = f"temp/{upload_file.filename}"
    with open(file_path, "wb") as temp_file:
        temp_file.write(await upload_file.read())

    decompressed_file_path = decompress_file(file_path)

    def iterate_file():
        with open(decompressed_file_path, "rb") as file:
            while True:
                chunk = file.read(8192)#8192 is the number of bytes that will be read in a single chunk
                if not chunk:
                    break
                yield chunk

    headers = {
        'Content-Disposition': f'attachment; filename="{upload_file.filename}.decompressed"'
    }

    # Return the compressed file as a downloadable response
    return StreamingResponse(iterate_file(), media_type="application/octet-stream", headers=headers)