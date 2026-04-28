import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <>
            <div className="w-full min-h-60 flex flex-col gap-2 justify-center items-center text-slate-900 dark:text-slate-100">
                <div>
                    <Loader size={38} className="animate-spin" />
                </div>
                <div>
                    <p>Loading</p>
                </div>
            </div>
        </>
    )
}
