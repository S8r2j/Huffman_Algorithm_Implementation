from fastapi import FastAPI,APIRouter

from node import Nodes
from operations import get_codes,get_encode_output,get_space_difference,ChractersCount

router=APIRouter()

@router.get("/encoded")
def get_encoded(data):
    charCount=ChractersCount(data) #getting the unique characters along with its repeated times
    char=charCount.keys() #storing the characters in char variable
    count=charCount.values() #storing the character's repitited times in count variable
    nodes=[]
    # converting the characters into huffman tree
    for chars in char:
        nodes.append(Nodes(charCount.get(chars),chars))
    while(len(nodes)>1):
        nodes=sorted(nodes,key=lambda x:x.probability)
