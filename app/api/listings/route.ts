import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import { auth } from '@clerk/nextjs';

export async function POST(request: Request) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        location,
        price,
        experience, // new field
        expertise, // new field
        sessionLength, // new field
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId,
            experience: parseInt(experience, 10),
            expertise, // new field
            sessionLength: parseInt(sessionLength, 10),
        },
    });
}