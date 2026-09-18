import Section from './Section'
import { skillGroups, technologies } from '../data/skills'

export default function Skills() {
  return (
    <Section id="tech" title="Technologies I Use">
      <ul className="my-9 grid grid-cols-4 gap-x-3 gap-y-6 md:gap-5 lg:grid-cols-8">
        {technologies.map(({ name, icon }) => (
          <li
            key={name}
            className="flex flex-col items-center gap-3.5 text-center"
          >
            <img
              src={icon}
              width="64"
              height="64"
              alt=""
              loading="lazy"
              className="size-12 object-contain md:size-16"
            />
            <span className="text-[0.85rem] md:text-[1rem]">{name}</span>
          </li>
        ))}
      </ul>
      <dl className="my-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {skillGroups.map(({ name, items }) => (
          <div key={name}>
            <dt className="mb-2 font-bold text-lavender">{name}</dt>
            <dd className="leading-[1.7] text-muted">{items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
