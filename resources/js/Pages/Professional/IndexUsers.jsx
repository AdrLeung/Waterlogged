"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/Contexts/ToastContext";
import AppLayout from "@/Layouts/AppLayout";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { router } from "@inertiajs/react";

export default function IndexUsers({
    professionals,
    users,
    usersProfessionalInfo,
}) {
    usersProfessionalInfo = usersProfessionalInfo[0];

    const { addToast } = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [degree, setDegree] = useState(usersProfessionalInfo.degree || "");
    const [certification, setCertification] = useState(
        usersProfessionalInfo.certification || ""
    );
    const [specialization, setSpecialization] = useState(
        usersProfessionalInfo.specialization || ""
    );

    const makeProfessional = (email) => {
        router.post(
            route("users.promote", { email }),
            {},
            {
                onSuccess: () => {
                    addToast("user successfully promoted", "error");
                },
            }
        );
    };

    const handleUpdateCredentials = () => {
        router.post(
            route("professional.update", {
                email: usersProfessionalInfo.email,
                degree,
                certification,
                specialization,
            }),
            {},
            {
                onSuccess: () => {
                    addToast("Credentials updated successfully!", "success");
                },
            }
        );
        setIsDialogOpen(false);
    };

    return (
        <AppLayout>
            <h1>your info</h1>
            <p>{usersProfessionalInfo.username}</p>
            <p>{usersProfessionalInfo.degree}</p>
            <p>{usersProfessionalInfo.certification}</p>
            <p>{usersProfessionalInfo.specialization}</p>
            <br />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Update My Info</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update My Credentials</DialogTitle>
                        <DialogDescription>
                            Edit your degree, certification, and specialization
                            information.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="degree">Degree</Label>
                            <Input
                                id="degree"
                                type="text"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                placeholder="Enter your degree"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="certification">Certification</Label>
                            <Input
                                id="certification"
                                type="text"
                                value={certification}
                                onChange={(e) =>
                                    setCertification(e.target.value)
                                }
                                placeholder="Enter your certification"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="specialization">
                                Specialization
                            </Label>
                            <Input
                                id="specialization"
                                type="text"
                                value={specialization}
                                onChange={(e) =>
                                    setSpecialization(e.target.value)
                                }
                                placeholder="Enter your specialization"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleUpdateCredentials}
                            className="w-full"
                        >
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <br />
            <h1>professionals</h1>
            {professionals.map((professional, index) => (
                <div key={index}>
                    <p>{professional.username}</p>
                    <p>{professional.degree}</p>
                    <p>{professional.certification}</p>
                    <p>{professional.specialization}</p>
                    <br />
                </div>
            ))}

            <h1>users</h1>

            {users.map((user, index) => (
                <div key={index}>
                    <p>{user.username}</p>
                    <Button
                        className="overflow-visible bg-green-800"
                        onClick={() => makeProfessional(user.email)}
                    >
                        make user
                    </Button>
                </div>
            ))}
        </AppLayout>
    );
}
