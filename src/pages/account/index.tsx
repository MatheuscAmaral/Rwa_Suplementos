import Container from "@/components/container";
// import { AuthContext } from "@/contexts/AuthContext";
// import { useContext } from "react";

export const Account = () => {
    // const {user} = useContext(AuthContext);
    
    return (
        <main className="h-svh">
            <Container>
                <h1 className="text-2xl font-semibold text-gray-700">Minha conta</h1>

                    {/* {
                        user.map(u => {
                            return (
                                <div className="rounded-md px-10 grid grid-cols-2 mx-auto w-full gap-10 pt-4 pb-5 mt-5">
                                   
                                </div>
                            )
                        })
                    } */}
            </Container>
        </main>
    )
}