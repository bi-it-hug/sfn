"use client"

import { NodeItem, NodeResponse } from "@/types/nodes"
import { unwrapListResponse } from "@/lib/api"
import { useFetch } from "@/hooks/use-fetch"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function NodeTable() {
    const { data: rawData } = useFetch("/api/nodes", {
        initialData: [] as NodeItem[],
        parse: (json) => unwrapListResponse(json as NodeResponse),
        errorMessage: "Could not load chart data.",
    })
    const noValue = <p className="text-muted-foreground">Empty</p>

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Nodes</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>UUID</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rawData?.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {entry.id}
                                </TableCell>
                                <TableCell>
                                    {entry.name == "" ? noValue : entry.name}
                                </TableCell>
                                <TableCell>
                                    {entry.uuid == "" ? noValue : entry.uuid}
                                </TableCell>
                                <TableCell>
                                    {entry.ipAddress == ""
                                        ? noValue
                                        : entry.ipAddress}
                                </TableCell>
                                <TableCell>
                                    {entry.location == ""
                                        ? noValue
                                        : entry.location}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
