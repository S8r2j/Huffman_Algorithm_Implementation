# defining class nodes along with the parameters
# Node of a Huffman Tree
class Nodes:
    def __init__(self, probability, symbol, left=None, right=None):
        # probability of the symbol
        self.probability = probability

        # the symbol
        self.symbol = symbol

        # the left node
        self.left = left

        # the right node
        self.right = right

        # the tree direction or edge value(0 or 1)
        self.code = ''