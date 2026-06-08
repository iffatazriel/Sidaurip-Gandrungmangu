import { SkeletonTable, SkeletonStat } from "@/components/ui/Skeleton";

export default function AkunWargaLoading() {
  return (
    <>
      <div className="mb-6 space-y-2">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <div className="h-4 w-72 rounded bg-gray-100" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
      </div>

      <SkeletonTable />
    </>
  );
}
