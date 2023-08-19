import React from "react";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";


const Page = async () => {

    const user = await currentUser();

    if (!user) return null;


    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    //fetch users

    const results = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 30
    })

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            {/* search bar */}
            <div className="mt-14 flex flex-col gap-9">
                {results?.users?.length === 0 ? (
                    <p className="no-result">No users Found</p>
                ) : (
                    <React.Fragment>
                        {results?.users?.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType="User"
                            />
                        ))}
                    </React.Fragment>
                )}
            </div>
        </section>
    )
}

export default Page