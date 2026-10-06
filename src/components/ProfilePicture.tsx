import { cx } from "class-variance-authority";

import profilePictureImg from "@/assets/images/profile_picture.webp";
import { shadowVariants, type ShadowVariants } from "@/components/Shadow";

type Props = ShadowVariants;

export default function ProfilePicture({ shadow = "hatched-sm" }: Props) {
  return (
    <div className={cx("ProfilePicture", shadowVariants({ shadow }))}>
      <img
        className="ProfilePicture__image"
        src={profilePictureImg}
        alt="Portrait of Nik Brunner"
      />
      <div className="ProfilePicture__overlay"></div>
    </div>
  );
}
