import { CometCard } from "@/components/ui/comet-card";

interface ProfilePhotoCometProps {
  photoUrl?: string | null;
  isAdmin?: boolean;
}

export function ProfilePhotoComet({
  photoUrl,
  isAdmin,
}: ProfilePhotoCometProps) {
  return (
    <CometCard>
      <div
        className="flex w-[300px] cursor-pointer flex-col items-stretch rounded-[16px] border-2 border-black bg-white p-2"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
        }}
      >
        <div className="flex-1">
          <div className="relative aspect-[3/4] w-full">
            {photoUrl ? (
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[12px] object-cover"
                alt="Profile photo"
                src={photoUrl}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 10px 0px",
                }}
              />
            ) : (
              <div className="absolute inset-0 h-full w-full rounded-[12px] bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  {isAdmin ? "Click edit to add photo" : "No photo yet"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CometCard>
  );
}
