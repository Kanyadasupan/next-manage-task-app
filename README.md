# 📝 Manage Task App

**Manage Task App** เป็นเว็บแอปพลิเคชันสำหรับบริหารจัดการรายการงานที่ต้องทำ (To-Do List) พัฒนาด้วย **Next.js** และใช้งาน **Supabase** ในการจัดการฐานข้อมูลและจัดเก็บรูปภาพ ช่วยให้คุณบันทึกงาน ติดตามสถานะ และอัปโหลดรูปภาพประกอบได้อย่างง่ายดาย

## ✨ คุณสมบัติหลัก (Features)

* 📋 **Task Dashboard**: หน้าหลักแสดงรายการงานทั้งหมด พร้อมระบุสถานะ "เสร็จสิ้น" หรือ "ยังไม่เสร็จ"
* ➕ **Task Logging**: เพิ่มรายการงานใหม่ โดยระบุชื่อเรื่อง, รายละเอียดงาน และอัปโหลดรูปภาพประกอบ
* 🖼️ **Image Management**: รองรับการอัปโหลดรูปภาพงานขึ้นสู่ Cloud Storage (Supabase) และระบบ Preview ก่อนบันทึก
* 🔍 **Smart Actions**: สามารถลบงานที่ทำเสร็จแล้ว โดยระบบจะลบรูปภาพที่เกี่ยวข้องออกจาก Storage ให้โดยอัตโนมัติ
* ✏️ **Edit & Update**: ระบบแก้ไขข้อมูลงานเดิม รวมถึงการเปลี่ยนรูปภาพประกอบใหม่
* 🕒 **Timestamping**: บันทึกวันเวลาที่สร้างงานและวันที่อัปเดตข้อมูลล่าสุดอย่างแม่นยำ
* 📱 **Responsive Design**: แสดงผลได้สวยงามและใช้งานง่ายบนทุกอุปกรณ์ด้วย Tailwind CSS

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

* **Frontend**: [Next.js 14+](https://nextjs.org/) (App Router & Client Components)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Modern UI & Typography)
* **Database & Storage**: [Supabase](https://supabase.com/)
* **Language**: TypeScript

## 🚀 การติดตั้งและใช้งาน (Getting Started)

1. **Clone โปรเจกต์:**
    ```bash
    git clone [https://github.com/KanyadaSupan/manage-task-app.git](https://github.com/KanyadaSupan/manage-task-app.git)
    cd manage-task-app
    ```

2. **ติดตั้ง Dependencies:**
    ```bash
    npm install
    ```

3. **ตั้งค่า Environment Variables:**
    สร้างไฟล์ `.env.local` ใน Root directory และเพิ่มค่าจาก Supabase ของคุณ:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. **เตรียมฐานข้อมูลบน Supabase:**
    * สร้าง Table `task_tb`: (id, title, detail, is_completed, image_url, created_at, update_at)
    * สร้าง Storage Bucket: `task_bk` (ตั้งค่าเป็น Public เพื่อให้แสดงรูปภาพได้)

5. **รันโปรเจกต์:**
    ```bash
    npm run dev
    ```
    เข้าใช้งานผ่าน `http://localhost:3000`

## 📁 โครงสร้างโฟลเดอร์ที่สำคัญ

* `/app/page.tsx` - หน้า Landing Page (Welcome Screen)
* `/app/alltask` - หน้าแสดงรายการงานทั้งหมดและระบบลบข้อมูล
* `/app/addtask` - ฟอร์มสำหรับบันทึกงานใหม่พร้อมอัปโหลดรูป
* `/app/edittask/[id]` - ระบบแก้ไขข้อมูลงานตาม ID
* `/lib/supabaseClient.ts` - ไฟล์เชื่อมต่อและตั้งค่า Supabase SDK
* `/assets/` - ไฟล์รูปภาพโลโก้และ Static Assets ของแอป

---
**Developed by [Kanyada](https://github.com/KanyadaSupan)**
*Student at Southeast Asia University | Digital Technology and Innovation*
