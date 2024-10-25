'use client';

import Link from "next/link";

const Page = () => {
    return (
        <>
            <div className="pb-[15px]">
                <h1 className="text-[20px] mda-1:text-[30px] text-zinc-800 font-semibold">
                    This is Another Page.
                </h1>
            </div>
            <Link
                href="/"
                title="Go To / Page"
                className="inline-block text-[14px] py-[8px] px-[15px] font-semibold bg-zinc-700 text-zinc-200 hover:bg-zinc-900">
                Go To / Page
            </Link>
        </>
    )
};

export default Page;