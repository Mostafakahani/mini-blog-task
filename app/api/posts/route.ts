import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Post } from "@/lib/types";

const dataFilePath = path.join(process.cwd(), "data", "posts.json");

// اطمینان از وجود دایرکتوری data
const ensureDirectoryExists = () => {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
};

// متد GET برای دریافت همه پست‌ها یا یک پست خاص
export async function GET(request: NextRequest) {
  ensureDirectoryExists();

  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    const posts = JSON.parse(data);

    // بررسی وجود پارامتر id در URL
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const post = posts.find((p: Post) => p.id === parseInt(id));
      if (!post) {
        return NextResponse.json(
          { message: "Post not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(post);
    }

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { message: "Error reading posts" },
      { status: 500 }
    );
  }
}

// متد POST برای ایجاد پست جدید
export async function POST(request: NextRequest) {
  ensureDirectoryExists();

  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    const posts = JSON.parse(data);

    const body = await request.json();
    const newPost = {
      id: Date.now(),
      ...body,
    };

    posts.push(newPost);
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
}

// متد DELETE برای حذف یک پست
export async function DELETE(request: NextRequest) {
  ensureDirectoryExists();

  try {
    // بررسی وجود پارامتر id در URL
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "شناسه پست الزامی است" },
        { status: 400 }
      );
    }

    const data = fs.readFileSync(dataFilePath, "utf8");
    const posts = JSON.parse(data);

    // پیدا کردن پست با شناسه مورد نظر
    const postIndex = posts.findIndex((p: Post) => p.id === parseInt(id));

    if (postIndex === -1) {
      return NextResponse.json(
        { message: "پست مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // حذف پست از آرایه
    posts.splice(postIndex, 1);

    // ذخیره تغییرات
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ message: "پست با موفقیت حذف شد" });
  } catch {
    return NextResponse.json({ message: "خطا در حذف پست" }, { status: 500 });
  }
}

// متد PUT برای بروزرسانی یک پست
export async function PUT(request: NextRequest) {
  ensureDirectoryExists();

  try {
    // بررسی وجود پارامتر id در URL
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "شناسه پست الزامی است" },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.title || !body.body) {
      return NextResponse.json(
        { message: "عنوان و محتوای پست الزامی است" },
        { status: 400 }
      );
    }

    const data = fs.readFileSync(dataFilePath, "utf8");
    const posts = JSON.parse(data);

    // پیدا کردن پست با شناسه مورد نظر
    const postIndex = posts.findIndex((p: Post) => p.id === parseInt(id));

    if (postIndex === -1) {
      return NextResponse.json(
        { message: "پست مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // بروزرسانی پست
    posts[postIndex] = {
      ...posts[postIndex],
      title: body.title,
      body: body.body,
      // اگر اطلاعات کاربر ارسال شده باشد، آن را نیز بروزرسانی می‌کنیم
      ...(body.user && { user: body.user }),
    };

    // ذخیره تغییرات
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

    return NextResponse.json(posts[postIndex]);
  } catch {
    return NextResponse.json(
      { message: "خطا در بروزرسانی پست" },
      { status: 500 }
    );
  }
}
