import heapq  #priority queue
from collections import defaultdict
from pathlib import Path
from node import HuffmanNode

def generate_frequency_table(data):
    frequency_table = defaultdict(int)
    for char in data:
        frequency_table[char] += 1
    return frequency_table


def build_huffman_tree(frequency_table):
    priority_queue = [[weight, HuffmanNode(char, weight)] for char, weight in frequency_table.items()]
    heapq.heapify(priority_queue)

    while len(priority_queue) > 1:
        lo = heapq.heappop(priority_queue)
        hi = heapq.heappop(priority_queue)
        merged_node = HuffmanNode(None, lo[0] + hi[0], lo[1], hi[1])
        heapq.heappush(priority_queue, [merged_node.freq, merged_node])

    return priority_queue[0][1]


def generate_huffman_codes(node, current_code, huffman_codes):
    if node.char:
        huffman_codes[node.char] = current_code
        return

    generate_huffman_codes(node.left, current_code + "0", huffman_codes)
    generate_huffman_codes(node.right, current_code + "1", huffman_codes)


def compress_file(file_path):
    with open(file_path, "rb") as file:
        data = file.read()

    frequency_table = generate_frequency_table(data)
    huffman_tree = build_huffman_tree(frequency_table)
    huffman_codes = {}
    generate_huffman_codes(huffman_tree, "", huffman_codes)
    global var
    var=huffman_codes
    compressed_data = "".join(huffman_codes[char] for char in data)
    padding = 8 - len(compressed_data) % 8
    compressed_data += padding * "0"
#conversion  into bytes
    byte_array = bytearray()
    for i in range(0, len(compressed_data), 8):
        byte = compressed_data[i:i + 8]
        byte_array.append(int(byte, 2))

    compressed_file_path = Path(file_path).with_suffix(".compressed")
    with open(compressed_file_path, "wb") as output_file:
        output_file.write(bytes([padding]))
        output_file.write(byte_array)
    return compressed_file_path


def decompress_file(file_path):
    with open(file_path, "rb") as file:
        padding = int.from_bytes(file.read(1), "big")
        compressed_data = file.read()

    bit_string = "".join(format(byte, "08b") for byte in compressed_data)
    bit_string = bit_string[:-padding]
    huffman_codes=var
    decoded_data = ""
    current_code = ""
    for bit in bit_string:
        current_code += bit
        for char, code in huffman_codes.items():
            if code == current_code:
                decoded_data += chr(char)
                current_code = ""
                break

    decompressed_file_path = Path(file_path).with_suffix(".decompressed")
    with open(decompressed_file_path, "w",encoding="utf-8") as output_file:
        output_file.write(decoded_data)

    return decompressed_file_path
