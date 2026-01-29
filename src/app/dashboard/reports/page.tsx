export default function ReportsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Comprehensive reports and analytics across all modules.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="aspect-square rounded-xl bg-muted/50" />
                <div className="aspect-square rounded-xl bg-muted/50" />
                <div className="aspect-square rounded-xl bg-muted/50" />
                <div className="aspect-square rounded-xl bg-muted/50" />
            </div>
        </div>
    )
}
