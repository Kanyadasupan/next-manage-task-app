"use client";
import Image from "next/image";
import logo from "@/assets/work-order.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";


export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [is_Completed, setIsCompleted] = useState<boolean>(false);
  const [image_File, setImageFile] = useState<File | null>(null);
  const [preview_File, setPreviewFile] = useState<string>("");

  function handleSelecImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    setImageFile(file);
    if(file){
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  }

  async function handleUplodeAndSave(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert('อัพโหลดรูปภาพและบันทึกข้อมูล....');
  }

  return (
    <div className="flex flex-col w-10/12 mx-auto">
      <div className="flex flex-col items-center mt-20 ">
        <Image src={logo} alt="Logo" width={150} height={150} />
        <h1 className="text-3xl font-bold mt-10">manage Task App</h1>
        <h1 className="text-3xl font-bold ">บันทึกงานที่ต้องทำ</h1>
      </div>

      <div className="mt-10 flex flex-col border border-gray-300 rounded-xl p-5 ">
        <h1 className="text-2xl font-bold ">➕ เพิ่มงานใหม่</h1>
      <form onSubmit={handleUplodeAndSave} className="mt-5">
      <div className="mt-5 flex flex-col ">
          <label className="text-xl font-bold ">งานที่ทำ</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-blue-400"
          ></input>
        </div>

        <div className="mt-5 flex flex-col ">
          <label className="text-xl font-bold ">รายละเอียดงาน</label>
          <textarea
            className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-blue-400"
            rows={4}
          ></textarea>
        </div>

        <div className="mt-5 flex flex-col ">
          <label className="text-xl font-bold ">อับโหลดรูปภาพ</label>
          <input id="fileInput" type="file" className="hidden" accept="image/" onChange={handleSelecImagePreview}></input>
          <label
            htmlFor="fileInput"
            className="mt-2 bg-gray-200 hover:bg-gray-300 transition-all duration-300 text-gray-700 font-bold py-2 px-4 w-max rounded cursor-pointer"
          >
            เลือกไฟล์
          </label>
          {preview_File && (
            <div className="mt-3">
              <Image
                src={preview_File}
                alt="Preview"
                width={100}
                height={100}
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-xl font-bold " htmlFor="status">
            สถานะงาน
          </label>
          <select className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-blue-400 w-full " >
            <option value="0">ยังไม่เสร็จ</option>
            <option value="1">เสร็จ</option>
          </select>
        </div>

        <div className="flex justify-center ">
          <button className="mt-5 bg-emerald-500 hover:bg-emerald-700 transition-all duration-300 text-white font-bold py-2 px-40 rounded  ">
            บันทึกงาน
          </button>
        </div>
</form>
        

        <div className="flex justify-center mt-5 ">
          <Link href="/" className="hover:underline text-blue-500 font-bold">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
