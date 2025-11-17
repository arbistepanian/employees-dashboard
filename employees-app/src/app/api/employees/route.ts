import { getErrorMessage } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const baseUrl = process.env.EMPLOYEES_API_BASE_URL!;
        const apiKey = process.env.EMPLOYEES_API_KEY!;

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));

        const res = await fetch(
            `${baseUrl}/api/employees?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error("Failed to fetch employees", await res.text());
            return NextResponse.json(
                { error: res.statusText || "Failed to fetch employees" },
                { status: res.status }
            );
        }

        const data = await res.json();
        return new NextResponse(JSON.stringify(data), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        const message = getErrorMessage(error);
        return NextResponse.json({ message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const baseUrl = process.env.EMPLOYEES_API_BASE_URL!;
    const apiKey = process.env.EMPLOYEES_API_KEY!;

    const body = await req.json();

    const res = await fetch(`${baseUrl}/api/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    return new NextResponse(JSON.stringify(data), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT(req: NextRequest) {
    const baseUrl = process.env.EMPLOYEES_API_BASE_URL!;
    const apiKey = process.env.EMPLOYEES_API_KEY!;

    const body = await req.json();
    const { id, ...update } = body;

    if (!id) {
        return NextResponse.json(
            { message: "Missing employee id for update." },
            { status: 400 }
        );
    }

    const res = await fetch(`${baseUrl}/api/employees/${id}`, {
        method: "PATCH", // maps to your NestJS @Patch(':id')
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(update),
    });

    const data = await res.json();
    return new NextResponse(JSON.stringify(data), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function DELETE(req: NextRequest) {
    const baseUrl = process.env.EMPLOYEES_API_BASE_URL!;
    const apiKey = process.env.EMPLOYEES_API_KEY!;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { message: "Missing employee id for delete." },
            { status: 400 }
        );
    }

    const res = await fetch(`${baseUrl}/api/employees/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    // your Nest delete likely returns the deleted entity or nothing;
    // handle both cases
    let data: unknown = {};
    try {
        data = await res.json();
    } catch {
        data = {};
    }

    return new NextResponse(JSON.stringify(data), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
    });
}
