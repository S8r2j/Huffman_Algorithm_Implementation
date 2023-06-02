from fastapi import FastAPI,APIRouter, File, UploadFile
from fastapi.responses import StreamingResponse,FileResponse
import io
import base64
import pickle
from operations import HuffmanEncoding, HuffmanDecoding

router=APIRouter()


@router.post("/encoded")
async def encode_file(file:UploadFile=File(...)):
    fyl=await file.read()
    data:str
    data=fyl.decode("utf-8") ##utf-8 is a character encoding system that allows you to represent characters as ASCII text
    encoded_output, the_tree  = HuffmanEncoding(data)
    global node_value
    encode_data=encoded_output
    node_value=the_tree
    data=encode_data.encode('utf-8')
    new_file=io.BytesIO()
    new_file.write(data)
    new_file.seek(0)
    temp_file_path = "./file.txt"  # Replace with your desired temporary file path
    with open(temp_file_path, "wb") as temp_file:
        temp_file.write(new_file.getvalue())

    # Return the modified file as a downloadable response
    return FileResponse(temp_file_path, filename=f"{file.filename}", media_type="application/octet-stream")


@router.post("/decoded")
async def decode_file(file:UploadFile=File(...)):
    encoded_data=await file.read()
    encoded_data=encoded_data.decode('utf-8')
    return HuffmanDecoding(encoded_data,node_value)


