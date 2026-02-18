import { NextResponse } from 'next/server'
import { releaseResults } from '@/lib/result-processing'

export async function GET() {
    try {
        const count = await releaseResults()
        return NextResponse.json({ success: true, released: count })
    } catch (error) {
        console.error("Result release failed", error)
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    }
}
