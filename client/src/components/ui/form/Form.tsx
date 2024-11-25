const Form = ({ children }: any) => {

    return (
        <div className="flex flex-col items-center m-12 ">
            <div className=" bg-white w-full max-w-lg shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {children}
            </div>
        </div>
    )

}
export default Form