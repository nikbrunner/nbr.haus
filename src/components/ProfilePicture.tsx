import { cx } from "class-variance-authority";

import profilePictureImg from "@/assets/images/profile_picture.jpg";
import { shadowVariants, type ShadowVariants } from "@/components/Shadow";

type Props = ShadowVariants;

export default function ProfilePicture({ shadow = "hatched-sm" }: Props) {
  return (
    <div className={cx("ProfilePicture", shadowVariants({ shadow }))}>
      <img
        className="ProfilePicture__image"
        src={profilePictureImg}
        alt="Nik Brunner's personal website - a black and white photograph of a modernist house representing his digital home"
      />
      <div className="ProfilePicture__overlay"></div>
    </div>
  );
}
