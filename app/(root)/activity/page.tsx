import React from "react";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


const Page = async () => {

    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    // get activity details
    const activity = await getActivity(userInfo._id);

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>

            <section className="mt-10 flex flex-col gap-5">
                {activity?.length > 0 ? (
                    <React.Fragment>
                        {activity?.map((activity) => (
                            <Link href={`/thread/${activity.parentId}`} key={activity._id}>
                                <article className="activity-card">
                                    <Image
                                        src={activity.author.image}
                                        alt="profile image"
                                        width={20}
                                        height={20}
                                        className="rounded-full object-cover"
                                    />
                                    <p className="!text-small-regular text-light-1">
                                        <span className="mr-1 text-primary-500">
                                            {activity.author.name}
                                        </span>{" "}
                                        replieed to your thread.
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </React.Fragment>
                ) : (
                    <p className="no-result">You caught all.</p>
                )}
            </section>
        </section>
    )
}

export default Page