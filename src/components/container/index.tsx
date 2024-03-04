

const Container = ({children}: any) => {
    return (
        <div className="flex flex-col gap-1 mt-10 max-w-6xl xl:mx-auto mx-5">
            {children}
        </div>
    )
}

export default Container;