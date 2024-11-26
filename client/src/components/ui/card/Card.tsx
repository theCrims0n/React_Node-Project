import { Users } from "lucide-react";

interface Props {
    values: {
        count: number;
        title: string;
        subtitle: string;
    }
}

const Card = ({ values }: Props) => {
    return (
        <>

            <div className="m-4 w-80 p-6 bg-white flex flex-col items-center bg-white border border-slate-200 rounded-lg shadow md:flex-row md:max-w-xl">
                <div className="flex flex-col justify-center p-2 leading-normal">
                    <Users size={35} />
                </div>
                <div className="flex flex-col justify-center p-6 leading-normal ">
                    <h1 className="font-medium text-center text-md text-slate-800">{values.title}</h1>
                    <p className="text-2xl font-bold text-center text-slate-800">{values.count}</p>
                    <span className="text-slate-400 text-sm mt-1 ">{values.subtitle}.</span>
                </div>
            </div>
        </>
    )

}

export default Card