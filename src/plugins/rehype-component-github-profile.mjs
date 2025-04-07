/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a GitHub Profile component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.user - The GitHub username.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Profile component.
 */
export function GithubProfileComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0) {
    return h("div", { class: "hidden" }, [
      'Invalid directive. ("github_profile" directive must be leaf type "::github_profile{user="user"}")',
    ]);
  }

  const { user } = properties;

  if (!user) {
    return h(
      "div",
      { class: "hidden" },
      'Invalid user. ("user" attribute must be provided)',
    );
  }

  const cardUuid = `GC${Math.random().toString(36).slice(-6)}`;

  const nAvatar = h(`div#${cardUuid}-avatar`, { class: "gc-avatar" });
  const nTitle = h("div", { class: "gc-titlebar" }, [
    h("div", { class: "gc-titlebar-left" }, [
      nAvatar,
      h("div", { class: "gc-user" }, user),
    ]),
    h("div", { class: "github-logo" }),
  ]);

  const nDescription = h(
    `div#${cardUuid}-description`,
    { class: "gc-description" },
    "Waiting for api.github.com...",
  );

  const nFollowers = h(
    `div#${cardUuid}-followers`,
    { class: "gc-followers" },
    "0 followers",
  );
  const nFollowing = h(
    `div#${cardUuid}-following`,
    { class: "gc-following" },
    "0 following",
  );

  const nScript = h(
    `script#${cardUuid}-script`,
    { type: "text/javascript", defer: true },
    `
      fetch('https://api.github.com/users/${user}', { referrerPolicy: "no-referrer" }).then(response => response.json()).then(data => {
        document.getElementById('${cardUuid}-card').href = data.html_url;
        document.getElementById('${cardUuid}-description').innerText = data.bio || 'No bio available.';
        document.getElementById('${cardUuid}-followers').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.followers).replaceAll("\u202f", '') + ' followers';
        document.getElementById('${cardUuid}-following').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.following).replaceAll("\u202f", '') + ' following';
        const avatarEl = document.getElementById('${cardUuid}-avatar');
        avatarEl.style.backgroundImage = 'url(' + data.avatar_url + ')';
        avatarEl.style.backgroundColor = 'transparent';
        document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
        console.log("[GITHUB-PROFILE] Loaded profile for ${user} | ${cardUuid}.")
      }).catch(err => {
        const c = document.getElementById('${cardUuid}-card');
        c.classList.add("fetch-error");
        console.warn("[GITHUB-PROFILE] (Error) Loading profile for ${user} | ${cardUuid}.")
      })
    `,
  );

  return h(
    `a#${cardUuid}-card`,
    {
      class: "card-github fetch-waiting no-styling",
      href: `https://github.com/${user}`,
      target: "_blank",
      user,
    },
    [
      nTitle,
      nDescription,
      h("div", { class: "gc-infobar" }, [nFollowers, nFollowing]),
      nScript,
    ],
  );
}
