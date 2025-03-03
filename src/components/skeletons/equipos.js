import SkekeletonEquipo from "@/components/skeletons/equipo"

export default function Skeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className='skeleton h-9 w-40 rounded-md self-end hover:shadow-lg cursor-pointer' />
      <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
        <SkekeletonEquipo />
        <SkekeletonEquipo />
        <SkekeletonEquipo />
      </div>
    </div>

  )
}