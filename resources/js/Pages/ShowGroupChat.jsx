import AppLayout from "@/Layouts/AppLayout";
import { useState } from "react";
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

export default function ShowGroupChat({groupInfo, messages}) {
    const { auth } = usePage().props;
    
    groupInfo = groupInfo[0]
    // console.log(groupInfo);
    console.log(messages);
    
    
    const [message, setMessage] = useState("");
        console.log(message);

        const handleSubmit = (e) => {
            e.preventDefault()

            router.post(route("message.store"), { groupId : groupInfo.ID, content : message});
            setMessage("");
        }

    return <AppLayout>
        {/* list all the messages  */}
        <p className="text-lg font-semibold">{groupInfo.name}</p>

        <Card>
            <CardContent>
                <form type="submit" onSubmit={handleSubmit} className="flex-col items-center gap-2 flex-grow space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-3 w-fit max-w-[75%]">
                        <p className="text-base text-gray-900 leading-tight ${message.email === auth.email? bg-blue-900 : bg-red-900}">{message.data}</p>
                        <p className="text-xs text-gray-500 mt-1">{message.username}</p>
                    </div>
                    
                )
                )}
                    <Input type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}}
                    />
                    <Button type="submit"> Send</Button>
                </form>
            </CardContent>
        </Card>


    </AppLayout>

}