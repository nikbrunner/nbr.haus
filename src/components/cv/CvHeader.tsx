import { cx } from "class-variance-authority";
import { Github, Globe, Languages, Linkedin, Mail, MapPin } from "lucide-react";

import { shadowVariants, type ShadowVariants } from "@/components/Shadow";

type Props = {
  name: string;
  tagline: string;
  summary: string;
  img: string;
  languages: string;
  contact: {
    location: string;
    website: string;
    email: string;
    github: string;
    linkedin: string;
  };
} & ShadowVariants;

export function CvHeader({ shadow = "hard-sm", ...props }: Props) {
  return (
    <header className="CvHeader">
      <div className="CvHeader__texts">
        <h1 className="CvHeader__name">{props.name}</h1>
        <p className="CvHeader__tagline"> {props.tagline} </p>
        <p className="CvHeader__summary">{props.summary}</p>

        <div className="CvHeader__contact">
          <span>
            <MapPin size={14} />
            {props.contact.location}
          </span>
          <span>
            <Globe size={14} />
            {props.contact.website}
          </span>
          <span>
            <Mail size={14} />
            {props.contact.email}
          </span>
          <span>
            <Github size={14} />
            {props.contact.github}
          </span>
          <span>
            <Linkedin size={14} />
            {props.contact.linkedin}
          </span>
          <span>
            <Languages size={14} />
            {props.languages}
          </span>
        </div>
      </div>

      <div className="CvHeader__aside">
        <div className={cx("CvHeader__photo-wrapper", shadowVariants({ shadow }))}>
          <img className="CvHeader__photo" src={props.img} alt="Nikolaus Brunner" />
        </div>
      </div>
    </header>
  );
}
