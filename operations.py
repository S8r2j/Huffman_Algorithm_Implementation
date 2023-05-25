import node
# for getting the unique characters and count the repeating characters

def ChractersCount(text):
    symbols={}
    for char in text:
        if(symbols.get(char)==None):
            symbols[char]=1
        else:
            symbols[char]+=1
    return symbols


# getting codes of symbols in huffman tree
def get_codes(node:node.Nodes,old_code=''):
    codes = {}
    new_code=old_code+ str(node.code)
    # for traversing in child nodes
    if(node.left):
        get_codes(node.left,new_code)
    if(node.right):
        get_codes(node.right,new_code)
    if(not node.left and not node.right):
        codes[node.symbols]=new_code
    return codes

# Outputs the encoded result
def get_encode_output(text,code):
    result=[]
    for char in text:
        print(code[char],end="")
        result.append(code[char])
    output=""
    for x in result:
        output+=x
    return output

# for comparing the space before and after compression
def get_space_difference(text,code):
    before_compress=len(text)*8
    after_compress=0
    symbols=code.keys()
    for char in symbols:
        count=text.count(char)
        after_compress+=count*len(code[char])
    print("Before compression space(in bits) = ",before_compress)
    print("After compress space(in bits) = ",after_compress)