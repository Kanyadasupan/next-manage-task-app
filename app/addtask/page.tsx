"use client";
import Image from "next/image";
import logo from "@/assets/work-order.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";



//สร้างประเภทตัวแปลเพื่อเก็บข้อมูลที่ดึงมาจาก Supabase
export default function Page() {

  // router
const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [is_Completed, setIsCompleted] = useState<boolean>(false);
  const [image_File, setImageFile] = useState<File | null>(null);
  const [preview_File, setPreviewFile] = useState<string>("");

//เลือกรูปภาพและแสดงตัวอย่างรูปภาพ
  function handleSelecImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    setImageFile(file);
    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  }
  
//อัพโหลดรูปภาพและบันทึกข้อมูลลงฐานข้อมูลSupabase
  async function handleUplodeAndSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //สร้างตัวแปร image_url เพื่อเก็บ URL ของรูปภาพที่อัพโหลด เพื่อเอาไปบันทึกลงตาราง task_tb
    let image_url = "";
    // validate image file
    if (image_File) {
      // if have image file, upload to supabase storage
      // named new file to avoid duplicate file name
      const new_image_file_name = `${Date.now()}-${image_File.name}`;

      // upload image to supabase storage
      const { data, error } = await supabase.storage
        .from("task_bk")
        .upload(new_image_file_name, image_File);

      // after upload image, check the result
      // if there is error, show alert and return, if no error, get the image url and stored in variable image_url
      if (error) {
        // show alert and return
        alert("พบปัญหาในการอัพโหลดรูปภาพ กรุณาลองใหม่อีกครั้ง");
        console.log(error.message);
        return;
      } else {
        // no error, get the image url and stored in variable image_url
        const { data } = await supabase.storage
          .from("task_bk")
          .getPublicUrl(new_image_file_name);
        image_url = data.publicUrl;
      }
    }
    const {data,error} = await supabase
      .from('task_tb')
      .insert({
        title: title,
        detail: detail,
        is_completed: is_Completed,
        image_url: image_url,
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
      })

      if(error){
        alert('พบปัญหาในการบันทึกข้อมูล');
        console.log(error.message);
        return;
      }else{
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
        //เคลียตัวแปร state ต่างๆให้เป็นค่าว่างเหมือนเดิม
        setTitle("");
        setDetail("");
        setIsCompleted(false);
        setImageFile(null);
        setPreviewFile("");
        image_url = "";
        // redirect to all task page
        router.push('/alltask');
      }
  
  }

  return (
    <div className="flex flex-col w-10/12 mx-auto mb-10">
      <div className="flex flex-col items-center mt-20 ">
        <Image src={logo} alt="Logo" width={100} height={100} priority />
        <h1 className="text-3xl font-bold mt-5">manage Task App</h1>
        <h1 className="text-3xl font-bold ">บันทึกงานที่ต้องทำ</h1>
      </div>

      <div className="w-full mx-w-lg border-2 border-gray-300 rounded-xl p-5 p-8 mt-10 space-y-6">
        <h1 className="text-xl font-bold text-center">➕ เพิ่มงานใหม่</h1>
        <form onSubmit={handleUplodeAndSave} className="mt-5" suppressHydrationWarning>
          <div className="mt-5 flex flex-col ">
            <label className="text-xl font-bold ">งานที่ทำ</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-blue-400"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
          </div>

          <div className="mt-5 flex flex-col ">
            <label className="text-xl font-bold ">รายละเอียดงาน</label>
            <textarea
              className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-blue-400"
              rows={4}
              onChange={(e) => setDetail(e.target.value)}
              value={detail}
            ></textarea>
          </div>

          <div className="mt-5 flex flex-col ">
            <label className="text-xl font-bold ">อับโหลดรูปภาพ</label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/"
              onChange={handleSelecImagePreview}
            ></input>
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
            <select className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-blue-400 w-full "
              value={is_Completed ? "1" : "0"}
              onChange={(e) => setIsCompleted(e.target.value === "1")}>
              <option value="0">ยังไม่เสร็จ</option>
              <option value="1">เสร็จ</option>
            </select>
          </div>

          <div className="flex justify-center ">
            <button className="mt-5 bg-emerald-500 hover:bg-emerald-700 transition-all duration-300 text-white font-bold py-2 px-4 rounded  ">
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
