# defining class nodes along with the parameters
class Nodes:
    def __init__(self, symbols, probability, left=None, right=None):
        # unique characters present in the text
        self.symbols=symbols
        # probability of getting a certain character
        self.probability=probability
        # left child for creating huffman tree
        self.left=left
        # right child for creating huffman tree
        self.right=right
        # 0 or 1 for denoting either left or right
        self.code=''