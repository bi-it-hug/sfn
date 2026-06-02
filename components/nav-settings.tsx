"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    FieldSeparator,
} from "@/components/ui/field"
import { SettingsIcon } from "lucide-react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSettings() {
    const { theme, setTheme } = useTheme()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <SidebarMenuButton tooltip="Settings">
                                <SettingsIcon /> Settings
                            </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Settings</DialogTitle>
                                <DialogDescription>
                                    Make changes to your liking here. Click save
                                    when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>

                            <FieldSeparator />

                            <FieldGroup>
                                <Field
                                    orientation="horizontal"
                                    className="justify-between"
                                >
                                    {/* className="mb-1.5"*/}
                                    <div className="flex flex-col">
                                        <FieldLabel>Theme</FieldLabel>
                                        <FieldDescription>
                                            Select your preffered color theme.
                                        </FieldDescription>
                                    </div>

                                    <Select
                                        value={theme}
                                        onValueChange={(value) =>
                                            setTheme(value)
                                        }
                                    >
                                        <SelectTrigger className="w-full max-w-32">
                                            <SelectValue placeholder="Select a theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Theme</SelectLabel>
                                                <SelectItem value="system">
                                                    System
                                                </SelectItem>
                                                <SelectItem value="light">
                                                    Light
                                                </SelectItem>
                                                <SelectItem value="dark">
                                                    Dark
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field
                                    orientation="horizontal"
                                    className="justify-between"
                                >
                                    <div className="flex flex-col">
                                        {/* className="mb-1.5"*/}
                                        <FieldLabel>Language</FieldLabel>
                                        <FieldDescription>
                                            Select your preffered language.
                                        </FieldDescription>
                                    </div>

                                    <Select defaultValue="english">
                                        <SelectTrigger className="w-full max-w-32">
                                            <SelectValue placeholder="Select a language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Language
                                                </SelectLabel>
                                                <SelectItem value="english">
                                                    English
                                                </SelectItem>
                                                <SelectItem value="german">
                                                    German
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>

                            <DialogFooter>
                                <p className="text-xs text-neutral-500 italic">
                                    *changes are saved automatically*
                                </p>
                                {/* <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button> */}
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
