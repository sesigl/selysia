import AppsPanel from "../../partials/settings/AppsPanel";

export default function Apps({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <>
      {/* Page header */}
      <div className="mb-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
          Account Settings ✨
        </h1>
      </div>

      {/* Content */}
      <div className="bg-white shadow-lg rounded-sm mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">
          {/*@ts-ignore */}
          <AppsPanel searchParams={searchParams} />
        </div>
      </div>
    </>
  );
}
