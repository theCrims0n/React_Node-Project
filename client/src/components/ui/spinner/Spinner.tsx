export default function Spinner() {

    return (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
            <div className="animate-spin inline-block size-14 border-[5px] border-current border-t-transparent text-slate-800 rounded-full dark:text-slate-700" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

