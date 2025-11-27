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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function IndexUsers({
    professionals,
    users,
    usersProfessionalInfo,
}) {
    usersProfessionalInfo = usersProfessionalInfo[0];

    const { addToast } = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLocationDialogOpen, setisLocationDialogOpen] = useState(false);

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [name, setName] = useState("");

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
                    addToast("user successfully promoted", "success");
                },
            }
        );
    };

    const createLocation = () => {
        if (latitude == null || longitude == null || name == "") {
            addToast("Please Enter all Location Information", "error");
        } else if(!(latitude < 90 && latitude > -90)){
            addToast("Latitude must be in the range of -90 - 90", "error");
        } else if (!(longitude < 180 && longitude > -180)) {
            addToast("Longitude must be in the range of -180 - 180", "error");
        } else {
        router.post(route("location.store"), {
            name: name,
            latitude: latitude,
            longitude: longitude,
        });
        addToast("New Location Created", "success");
        router.get(route("users.index"));
    }
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
            <div className="flex flex-col items-center w-full">
                <Card className="w-1/3 mt-4 mb-4 ">
                    <CardTitle className="pt-4 pl-4">
                        <h1>User Information</h1>
                    </CardTitle>
                    <CardHeader className="pl-4">
                        <p>{usersProfessionalInfo.username}</p>
                    </CardHeader>
                    <CardDescription className="pb-4 pl-4">
                        <p>{usersProfessionalInfo.degree}</p>
                        <p>{usersProfessionalInfo.certification}</p>
                        <p>{usersProfessionalInfo.specialization}</p>
                    </CardDescription>
                </Card>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">Update My Info</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update My Credentials</DialogTitle>
                            <DialogDescription>
                                Edit your degree, certification, and
                                specialization information.
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
                                <Label htmlFor="certification">
                                    Certification
                                </Label>
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

                <Dialog
                    open={isLocationDialogOpen}
                    onOpenChange={setisLocationDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="mb-4">Add New Location </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Location</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="Longitude">Longitude</Label>
                                <Input
                                    id="Longitude"
                                    type="number"
                                    value={longitude}
                                    onChange={(e) =>
                                        setLongitude(e.target.value)
                                    }
                                    placeholder="Longitude"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="Latitude">Latitude</Label>
                                <Input
                                    id="Latitude"
                                    type="number"
                                    value={latitude}
                                    onChange={(e) =>
                                        setLatitude(e.target.value)
                                    }
                                    placeholder="Longitude"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Location Name"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button onClick={createLocation} className="w-full">
                                Submit
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <div className="flex gap-4 mb-4">
                    <Card className="w-full max-h-[400px] overflow-auto">
                        <CardTitle className="pl-4 mt-4 mb-4">
                            <h1>Professionals</h1>
                        </CardTitle>
                        <CardDescription>
                            {professionals.map((professional, index) => (
                                <Card className="mb-4 ml-4 mr-4">
                                    <CardHeader className="pl-4">
                                        <p>{professional.username}</p>
                                    </CardHeader>
                                    <CardDescription className="pl-4 mb-2">
                                        <div key={index}>
                                            <p>{professional.degree}</p>
                                            <p>{professional.certification}</p>
                                            <p>{professional.specialization}</p>
                                        </div>
                                    </CardDescription>
                                </Card>
                            ))}
                        </CardDescription>
                    </Card>
                    <Card className="w-full max-h-[400px] overflow-auto">
                        <CardTitle className="pl-4 mt-4 mb-4">
                            <h1>Administrative actions</h1>
                        </CardTitle>
                        <CardDescription>
                            {users.map((user, index) => (
                                <div key={index} className="pl-4 mb-4">
                                    <p>{user.username}</p>
                                    <Button
                                        className="overflow-visible bg-green-800"
                                        onClick={() =>
                                            makeProfessional(user.email)
                                        }
                                    >
                                        Promote
                                    </Button>
                                </div>
                            ))}
                        </CardDescription>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
