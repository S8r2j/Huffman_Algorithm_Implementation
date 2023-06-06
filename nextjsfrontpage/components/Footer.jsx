import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
	return (
		<>
			<div className="bg-gray-50 h-1/16 w-full flex md:flex-row flex-col justify-around items-start p-2" style={{ height: "8%" }}>
				<div className="p-5 ">
					<ul>
						<p className="text-gray-800 font-bold text-3xl pb-6">
							Na<span className="text-blue-600">me</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-xl pb-4">Info</p>
						<li className="text-gray-500 text-md pb-2 font-sm hover:text-blue-600 cursor-pointer">
							Formats
						</li>
						<li className="text-gray-500 text-md pb-2 font-sm hover:text-blue-600 cursor-pointer">
							Compression
						</li>
						
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-xl pb-4">Help</p>
						<li className="text-gray-500 text-md pb-2 font-sm hover:text-blue-600 cursor-pointer">
							FAQ
						</li>
						<li className="text-gray-500 text-md pb-2 font-sm hover:text-blue-600 cursor-pointer">
							Status
						</li>
						
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-xl pb-4">Resource</p>
						<li className="text-gray-500 text-md pb-2 font-sm hover:text-blue-600 cursor-pointer">
							Developer API
						</li>
						<li className="text-gray-500 text-md pb-2 font-sm hover:text-blue-600 cursor-pointer">
							Tools
						</li>
						
					</ul>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
				<h1 className=" text-gray-800 text-sm font-sm">
					© 2023 All rights reserved | Build with ❤ by{" "}
					<span className="hover:text-blue-600 font-sm cursor-pointer">
					 name{" "}
					</span>
				</h1>
			</div>
		</>
	);
}

export default Footer;