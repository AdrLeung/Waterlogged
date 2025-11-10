import AppLayout from "@/Layouts/AppLayout";
import { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function ShowGroupChat({groupInfo, messages, groupsUserIsIn, usersInGroup}) {
    const { auth } = usePage().props;
    console.log(groupsUserIsIn);
    console.log(usersInGroup);   
    
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);

 
   
    groupInfo = groupInfo[0]
   
    
    const [message, setMessage] = useState("");
        console.log(message);

        const handleSubmit = (e) => {
            e.preventDefault()

            router.post(route("message.store"), { groupId : groupInfo.ID, content : message});
            setMessage("");
        }

    return <AppLayout>
        {/* list all the messages  */}
        <Card className="w-1/2 mx-auto">
            <CardTitle>
                <p className="text-3xl font-semibold text-center">{groupInfo.name}</p>
            </CardTitle>
            <CardContent>
                    <form type="submit" onSubmit={handleSubmit} className="flex-col items-center flex-grow gap-2 space-y-2">
                    {messages.map((message, index) => 
                    (
                        <div
                            key={index}
                            className={`flex ${message.email == auth.user.email ? "justify-end" : "justify-start"}`}>
                            <div key={index}
                            className={`rounded-lg p-3 w-fit max-w-[75%] ${message.email == auth.user.email ? "bg-blue-800 text-white self-end rounded-br-none" : "bg-red-800 text-white self-start rounded-bl-none"}`}>
                                <p className="text-base leading-tight text-white ">{message.data}</p>
                                <p className="mt-1 text-xs font-semibold text-white">{message.username}</p>
                                <p className="mt-1 text-xs font-semibold text-white">{message.timeSent}</p>
                            </div>
                        </div>
                    )
                    )}
                    <div className="flex items-center justify-center gap-x-2">
                        <Input type="text"
                        placeholder="Message..."
                        value={message}
                        onChange={(e) => {setMessage(e.target.value)}}
                        className={"w-1/2 border-black-900 "}
                        />
                        <Button type="submit"> Send</Button>
                    </div>
                    </form>
            </CardContent>
            <div ref={messagesEndRef} />

        </Card>
    </AppLayout>
}