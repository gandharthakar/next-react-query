'use client';

import CreateUserForm from "./components/createUserForm";
import UserList from "./components/userList";
import HomePager from "./pagers/homePager";
import Link from "next/link";
import { useGetUsers } from "./tenstack-query/queries";
import { useEffect, useState } from "react";

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

let page = 1;

const Page = () => {
	const a = () => {
		console.log('suc--query');
	}
	const b = () => {
		// console.log('err--query');
	}
	const c = () => {
		// console.log('oerr--query');
	}

	const enablePagination: boolean = true;
	const [pageNum, setPageNum] = useState<number>(page);
	const [disPrev, setDisPrev] = useState<boolean>(true);
	const [disNext, setDisNext] = useState<boolean>(false);

	const { data, status, isFetching, isError, isLoading, isPlaceholderData } = useGetUsers({ enpg: enablePagination, pageIndex: page, limit: 2 });

	const handlePrev = () => {
		page--;
		setPageNum(page);
		let isFirst = page > 1;
		if (!isFirst) {
			setDisPrev(true);
			setDisNext(false);
		} else {
			setDisPrev(false);
			setDisNext(false);
		}
	}

	const handleNext = () => {
		if (!isPlaceholderData) {
			page++;
			setPageNum(page);
			const isLast = page < data?.totalPages!;
			if (!isLast) {
				setDisPrev(false);
				setDisNext(true);
			} else {
				setDisPrev(false);
				setDisNext(false);
			}
		}
	}

	useEffect(() => {
		if (data?.success) {
			a();
		} else {
			b();
		}

		if (status == 'error') {
			c();
		}
		//eslint-disable-next-line
	}, [data]);

	return (
		<>
			<div className="flex items-start flex-wrap">
				<div className="min-h-[auto] mda-1:min-h-screen max-h-none mda-1:max-h-screen min-w-[auto] mda-1:min-w-[300px] w-full mda-1:w-auto overflow-y-auto border-b-[0px] mda-1:border-b-0 mda-1:border-r-[2px] border-solid border-zinc-800">
					<div className="pb-[20px] p-[20px] border-b-[2px] border-solid border-zinc-800">
						<CreateUserForm />
					</div>
					<HomePager />
					<div className="p-[20px] text-right">
						<Link
							href="/another-page"
							title="Another Page"
							className="inline-block text-[14px] py-[8px] px-[15px] font-semibold bg-zinc-700 text-zinc-200 hover:bg-zinc-900">
							Another Page
						</Link>
					</div>
				</div>
				<div className="w-full mda-1:flex-1">
					{isLoading && (<div className="p-[20px]">
						{isError && (<div className="text-[14px] font-semibold text-red-600">There was an error.</div>)}
						{isFetching && (<div className="text-[14px] font-semibold text-zinc-800">Fetching ...</div>)}
						<div className="text-[14px] font-semibold text-zinc-800">Loading ...</div>
					</div>)}

					<div>
						{
							data?.users.length ?
								(
									<>
										{
											data?.users.map((item: any) => (
												<UserList
													key={item.id}
													user_id={item.id}
													user_name={item.user_full_name}
													user_gender={capitalizeFirstLetter(item.user_gender)}
													user_gender_val={item.user_gender}
												/>
											))
										}
									</>
								)
								:
								(<div className="p-[20px]"><div className="text-[14px] font-semibold text-zinc-800">No Use Found.</div></div>)
						}
					</div>

					{
						enablePagination &&
						(
							<div className="flex p-[20px] items-center justify-center gap-x-[20px]">
								<button
									type="button"
									title="Prev"
									className="inline-block text-[14px] font-semibold border-[1px] py-[7px] px-[15px] border-solid border-zinc-800 focus:outline-0 bg-zinc-800 text-zinc-200 disabled:bg-zinc-400 disabled:border-zinc-400 disabled:pointer-events-none"
									disabled={disPrev}
									onClick={handlePrev}
								>
									Prev
								</button>
								<div className="inline-block text-[16px] text-zinc-800 font-semibold">
									{pageNum}
								</div>
								<button
									type="button"
									title="Next"
									className="inline-block text-[14px] font-semibold border-[1px] py-[7px] px-[15px] border-solid border-zinc-800 focus:outline-0 bg-zinc-800 text-zinc-200 disabled:bg-zinc-400 disabled:border-zinc-400 disabled:pointer-events-none"
									disabled={disNext}
									onClick={handleNext}
								>
									Next
								</button>
							</div>
						)
					}
				</div>
			</div>
		</>
	)
};

export default Page;