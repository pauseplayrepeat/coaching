'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "@/app/components/CategoryBox";
import Container from '../Container';
import { 
  GiMicrophone, 
  GiPianoKeys, 
  GiDrum, 
  GiGuitar, 
  GiSaxophone, 
  GiViolin, 
  GiMusicSpell,
  GiSoundWaves,
  GiMusicalNotes,
  GiBriefcase,
  GiSoundOff
} from 'react-icons/gi';

export const categories = [
  {
    label: 'Ableton',
    icon: GiMusicalNotes,
    description: 'Coaching for Ableton Live software!',
  },
  {
    label: 'FL Studio',
    icon: GiSoundWaves,
    description: 'Learn FL Studio techniques and music production!',
  },
  {
    label: 'Mixing',
    icon: GiSoundOff,
    description: 'Master the art of mixing and sound balancing!',
  },
  {
    label: 'Mastering',
    icon: GiSoundWaves,
    description: 'Learn the final step of music production - Mastering!',
  },
  {
    label: 'Vocal Production',
    icon: GiMicrophone,
    description: 'Learn techniques for recording and producing vocals!',
  },
  {
    label: 'Drum Programming',
    icon: GiDrum,
    description: 'Master the art of drum programming for electronic music!',
  },
  {
    label: 'Synthesis',
    icon: GiViolin,
    description: 'Learn about sound synthesis and designing your own sounds!',
  },
  {
    label: 'Sound Design',
    icon: GiMusicSpell,
    description: 'Learn about sound design for music and multimedia projects!',
  },
  {
    label: 'Marketing',
    icon: GiBriefcase,
    description: 'Learn how to market your music and build your brand!'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;