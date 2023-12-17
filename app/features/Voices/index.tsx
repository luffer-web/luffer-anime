import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { useSnapshot } from "valtio";
import { store } from "@/app/libs/valtio";
import {
  JikanCharacterData,
  JikanCharacters,
  JikanVoiceActor,
} from "@/app/types/jikan";
import styles from "./styles.module.css";

const Voices = () => {
  const { anime } = useJikanAnime();
  const snap = useSnapshot(store);
  const [voices, setVoices] = useState<JikanCharacters>();
  const [elements, setElements] = useState<React.JSX.Element[]>();

  useEffect(() => {
    if (anime) {
      fetch(
        `https://api.jikan.moe/v4/anime/${anime?.data[snap?.pos]
          .mal_id}/characters`,
      )
        .then((res) => res.json())
        .then((json) => setVoices(json));
    }
  }, [snap.pos]);

  useEffect(() => {
    if (anime) {
      setTimeout(
        () =>
          fetch(
            `https://api.jikan.moe/v4/anime/${anime?.data[snap?.pos]
              .mal_id}/characters`,
          )
            .then((res) => res.json())
            .then((json) => setVoices(json)),
        2000,
      );
    }
  }, [anime]);

  useEffect(() => {
    console.log(voices, voices?.data, voices?.data?.length);
    if (voices && voices.data && voices.data.length) {
      setElements(() => {
        return voices?.data?.map((voice: JikanCharacterData, i: number) => {
          return (
            <tr key={i}>
              <td>{voice?.character.name}</td>
              <td>
                <Image
                  src={voice?.character.images.webp.image_url}
                  alt={voice?.character.name}
                  width="50"
                  height="75"
                />
              </td>
              <td className={styles.person}>
                {voice?.voice_actors
                  .filter(
                    (voiceActor: JikanVoiceActor) =>
                      voiceActor.language === "Japanese",
                  )
                  .map((voiceActor: JikanVoiceActor, i: number) => (
                    <Image
                      src={voiceActor.person.images.jpg.image_url}
                      alt={voiceActor.person.name}
                      width="50"
                      height="75"
                      key={i}
                    />
                  ))}
              </td>
              <td>
                {voice?.voice_actors
                  .filter(
                    (voiceActor: JikanVoiceActor) =>
                      voiceActor.language === "Japanese",
                  )
                  .map((voiceActor: JikanVoiceActor, i: number) => {
                    return <p key={i}>{voiceActor.person.name}</p>;
                  })}
              </td>
            </tr>
          );
        });
      });
    }
  }, [voices]);

  useEffect(() => {
    if (elements) {
      console.log(elements);
    }
  }, [elements]);

  return (
    <section className={styles.section}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>CHARACTER</th>
            <th>IMAGE</th>
            <th>IMAGE</th>
            <th>VOICE ACTOR</th>
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </section>
  );
};

export { Voices };
