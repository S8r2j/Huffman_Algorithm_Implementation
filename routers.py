from fastapi import UploadFile, File, APIRouter, HTTPException,  status
from operations import compress_file, decompress_file
from fastapi.responses import StreamingResponse
import os

router=APIRouter()

compress_file_by_compressor=False
file_name:UploadFile
compressed_file:str
@router.post("/compress")
async def compress(upload_file: UploadFile = File(...)):
    global file_name
    file_name=upload_file
    file_path = f"temp/{upload_file.filename}"
    with open(file_path, "wb") as temp_file:
        temp_file.write(await upload_file.read())

    compressed_file_path = compress_file(file_path)
    global compress_file_by_compressor
    compress_file_by_compressor=True
    return compressed_file_path


@router.post("/decompress")
async def decompress(upload_file: UploadFile = File(...)):
    global compress_file_by_compressor
    if not compress_file_by_compressor:
        raise HTTPException(status_code=status.HTTP_412_PRECONDITION_FAILED,detail="Initially the file should be compressed using above compressor API")
    file_path = f"temp/{upload_file.filename}"
    with open(file_path, "wb") as temp_file:
        temp_file.write(await upload_file.read())

    decompressed_file_path = decompress_file(file_path)
    return decompressed_file_path

@router.get("/compression_ratio")
def compression_ratio():
    global compress_file_by_compressor
    if not compress_file_by_compressor:
        raise HTTPException(status_code=status.HTTP_412_PRECONDITION_FAILED,
                            detail="Initially the file should be compressed using above compressor API")
    global compressed_file
    return {"Size of file before compression": os.path.getsize(f"temp/{file_name.filename}"),
            "Size of file after compression": os.path.getsize(f"{compressed_file}"),
            "Compression Ratio(CR)": os.path.getsize(f"{compressed_file}")/os.path.getsize(f"temp/{file_name.filename}")}
