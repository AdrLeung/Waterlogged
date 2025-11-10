import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { router } from "@inertiajs/react";

export function CreateProjectDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        router.post(route("project.store", { name: name, desc: desc }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Project</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                        Add a new project to get started.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div>
                        <label htmlFor="name">Project Name</label>
                        <Input
                            id="name"
                            placeholder="Enter project name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="desc">Description</label>
                        <Input
                            id="desc"
                            placeholder="Enter project description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading || !name.trim()}
                        >
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
