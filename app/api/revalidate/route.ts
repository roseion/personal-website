import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody(request, process.env.SANITY_API_WEBHOOK_SECRET || '')

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    const _type = body?._type as string
    if (_type) {
      revalidateTag(_type, "seconds")
      revalidateTag('all', "seconds")
    }

    return NextResponse.json({ revalidated: true, type: _type })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
