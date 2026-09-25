--
-- PostgreSQL database dump
--

\restrict jcXRSVKSOhiyzoWWCHjvsKvcrkipXdza6aqLJWsgk4thFWwJfLnMKWkNi2kEqdG

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at, custom_claims_allowlist) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_recovery_code_sets; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_recovery_code_sets (id, user_id, mfa_factor_id, failed_verification_count, verification_locked_until, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_recovery_codes; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_recovery_codes (id, mfa_recovery_code_set_id, code_hash, consumed_at, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at, expires_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
20260625000000
20260821000000
20260821010000
20260824000000
20260824000001
20260831180000
\.


--
-- Data for Name: scim_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.scim_tokens (id, sso_provider_id, token_hash, prefix, created_at, expires_at, revoked_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: scim_users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.scim_users (id, sso_provider_id, user_id, resource, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
29	AVP Group 	2026-07-30 19:52:20.554+00	2026-07-10 19:42:01.262+00	/api/media/file/495023559_122100657644892747_8623752531928739940_n-65DsLqbstBMJHk7NFPMMwjrqvnb81F.jpg	\N	495023559_122100657644892747_8623752531928739940_n-65DsLqbstBMJHk7NFPMMwjrqvnb81F.jpg	image/jpeg	25461	940	788	50	50
46	element beauty salon	2026-07-31 20:27:28.357+00	2026-07-31 20:27:28.356+00	/api/media/file/Element-sH3Tt6lYaCLNpzL9jsbkkX4t398JY6.webp	\N	Element-sH3Tt6lYaCLNpzL9jsbkkX4t398JY6.webp	image/webp	1512	500	500	50	50
47	PeachyReformerWellness	2026-07-31 20:27:55.3+00	2026-07-31 20:27:55.3+00	/api/media/file/PeachyReformerWellness-xs2SNlj8x1S5zatPAuh8rF8l1BqXci.webp	\N	PeachyReformerWellness-xs2SNlj8x1S5zatPAuh8rF8l1BqXci.webp	image/webp	8652	875	838	50	50
48	PremiumIkra	2026-07-31 20:30:39.338+00	2026-07-31 20:30:39.338+00	/api/media/file/PremiumIkra-LgGHhNnpJaEZgjLRfdUJd95dPeER7i.webp	\N	PremiumIkra-LgGHhNnpJaEZgjLRfdUJd95dPeER7i.webp	image/webp	55654	1082	984	50	50
49	Poseydon Osuszanie	2026-08-01 16:05:27.264+00	2026-08-01 15:54:53.788+00	/api/media/file/IMAGE%202026-08-01%2018_02_56-RYHALfBkH8YYWax88HvXQ4eNHqN315.png	\N	IMAGE 2026-08-01 18_02_56-RYHALfBkH8YYWax88HvXQ4eNHqN315.png	image/png	92479	587	475	50	50
51	Stelaż Podwieszany	2026-08-01 16:30:00.456+00	2026-08-01 16:30:00.454+00	/api/media/file/Stelaz-b8XwwCBJ8RAZfo64DgNpQJzduHMTRs.jpg	\N	Stelaz-b8XwwCBJ8RAZfo64DgNpQJzduHMTRs.jpg	image/jpeg	353122	1005	1200	50	50
52	miska	2026-08-01 16:32:53.974+00	2026-08-01 16:32:53.973+00	/api/media/file/misa-stojaca2-1024x1024-1-Tsj5PgmRm3Hd0QCE1RUv1697veCeSQ.jpg	\N	misa-stojaca2-1024x1024-1-Tsj5PgmRm3Hd0QCE1RUv1697veCeSQ.jpg	image/jpeg	93718	1024	1024	50	50
53	wysokosc wC	2026-08-01 16:44:17.626+00	2026-08-01 16:44:17.625+00	/api/media/file/IMAGE%202026-08-01%20184258-IP5OiyI8xY3AHxX6FbdUEXSFzlkTXL.jpg	\N	IMAGE 2026-08-01 184258-IP5OiyI8xY3AHxX6FbdUEXSFzlkTXL.jpg	image/jpeg	68551	1242	1266	50	50
54	Wysokosc WC	2026-08-01 16:45:12.21+00	2026-08-01 16:45:12.21+00	/api/media/file/IMAGE%202026-08-01%2018_42_58-3AcFfHKjqxSFMorPbJhn2lYbNbQo4N.png	\N	IMAGE 2026-08-01 18_42_58-3AcFfHKjqxSFMorPbJhn2lYbNbQo4N.png	image/png	373408	1242	1266	50	50
50	Jak wybrać sedes WC? Najważniejsze informacje przed zakupem	2026-08-01 16:48:52.784+00	2026-08-01 16:22:30.791+00	/api/media/file/IMAGE%202026-08-01%2018_47_46-clDXi2xA1ji2JvEn6WnA324Q13sv7l.png	\N	IMAGE 2026-08-01 18_47_46-clDXi2xA1ji2JvEn6WnA324Q13sv7l.png	image/png	626954	1280	696	50	50
55	DAR. 	2026-08-01 16:57:26.821+00	2026-08-01 16:57:26.821+00	/api/media/file/FILE%202026-08-01%20185625-DEyyxIizHfQP5HIMKJF9y59ghXUyB5.mp4	\N	FILE 2026-08-01 185625-DEyyxIizHfQP5HIMKJF9y59ghXUyB5.mp4	video/mp4	13444755	\N	\N	\N	\N
18	Bathroom reno	2026-05-23 04:53:47.167+00	2026-05-23 04:53:45.986+00	/api/media/file/pexels-peter-vang-2157328093-35493891.jpg	\N	pexels-peter-vang-2157328093-35493891.jpg	image/jpeg	927743	4551	3413	50	50
56	DAR	2026-08-01 17:01:21.858+00	2026-08-01 17:00:27.644+00	/api/media/file/IMAGE%202026-08-01%2018_59_51-N6WcmQL7uiuaoVkfKqbXI5GSTDmDcr.png	\N	IMAGE 2026-08-01 18_59_51-N6WcmQL7uiuaoVkfKqbXI5GSTDmDcr.png	image/png	579640	649	1108	50	50
57	ddd	2026-08-01 17:12:43.51+00	2026-08-01 17:12:43.51+00	/api/media/file/FILE-2026-08-01-18_56_25.hevc.hevc-lyXc5cUKMK2crkwNN2RUjxesqHDUZW.mp4	\N	FILE-2026-08-01-18_56_25.hevc.hevc-lyXc5cUKMK2crkwNN2RUjxesqHDUZW.mp4	video/mp4	3965643	\N	\N	\N	\N
58	ddd	2026-08-01 17:15:45.407+00	2026-08-01 17:15:45.405+00	/api/media/file/FILE-2026-08-01-18_56_25.hevc-514diwNwPZOUuOkXk2wygj14IzVS9H.webm	\N	FILE-2026-08-01-18_56_25.hevc-514diwNwPZOUuOkXk2wygj14IzVS9H.webm	video/webm	11076230	\N	\N	\N	\N
25	DAR Sport Space	2026-07-08 14:44:05.631+00	2026-07-08 14:42:35.162+00	/api/media/file/DAR.jpg	\N	DAR.jpg	image/jpeg	10311	342	307	50	50
30	Grind House Gym	2026-07-10 19:42:35.204+00	2026-07-10 19:42:35.203+00	/api/media/file/GrindHouseGym.webp	\N	GrindHouseGym.webp	image/webp	44600	1875	1875	50	50
31	Manaland	2026-07-10 19:42:57.704+00	2026-07-10 19:42:57.704+00	/api/media/file/Manaland.webp	\N	Manaland.webp	image/webp	37482	2048	2048	50	50
32	Marinero Hair	2026-07-10 19:43:32.696+00	2026-07-10 19:43:32.696+00	/api/media/file/MarineroHair.webp	\N	MarineroHair.webp	image/webp	3438	360	360	50	50
35	Skill Shaurma Kebab Grill	2026-07-10 19:45:11.009+00	2026-07-10 19:45:11.009+00	/api/media/file/SkillShaurmaKebabGrill.webp	\N	SkillShaurmaKebabGrill.webp	image/webp	12296	1304	1304	50	50
36	The Sadovsky Barbershop	2026-07-10 19:45:37.118+00	2026-07-10 19:45:37.118+00	/api/media/file/TheSadovskyBarbershop.webp	\N	TheSadovskyBarbershop.webp	image/webp	39084	933	933	50	50
39	test 1	2026-07-18 17:42:38.473+00	2026-07-18 17:42:38.472+00	/api/media/file/6473926-uhd_2160_3840_25fps-tDHKdfIyqjQAS69l0a26K4DtyOsmok.mp4	\N	6473926-uhd_2160_3840_25fps-tDHKdfIyqjQAS69l0a26K4DtyOsmok.mp4	video/mp4	32182897	\N	\N	\N	\N
40	Reno	2026-07-18 21:20:17.43+00	2026-07-18 21:20:17.43+00	/api/media/file/13378280_1080_1920_30fps-REwUT6zPF9nX3DYm1MNu4kHG0wQ6iX.mp4	\N	13378280_1080_1920_30fps-REwUT6zPF9nX3DYm1MNu4kHG0wQ6iX.mp4	video/mp4	22449652	\N	\N	\N	\N
41	fg gerg e	2026-07-18 21:21:26.541+00	2026-07-18 21:21:26.54+00	/api/media/file/6473938-uhd_2160_3840_25fps-nYr0cHF9p6eGDPimW8MPocpm8VmTXS.mp4	\N	6473938-uhd_2160_3840_25fps-nYr0cHF9p6eGDPimW8MPocpm8VmTXS.mp4	video/mp4	27815226	\N	\N	\N	\N
42	fjs fs 	2026-07-18 21:23:26.531+00	2026-07-18 21:23:26.53+00	/api/media/file/6473929-uhd_2160_3840_25fps-Bv6qBujV7NJPkt35ijHbjiTaX3OkNc.mp4	\N	6473929-uhd_2160_3840_25fps-Bv6qBujV7NJPkt35ijHbjiTaX3OkNc.mp4	video/mp4	44065730	\N	\N	\N	\N
43	instas	2026-07-24 12:49:38.788+00	2026-07-24 12:49:38.788+00	/api/media/file/Screenshot%202026-07-21%20at%207.17.46%E2%80%AFPM-xeujKwKozGKqcFLZJbgISANg9b5csP.png	\N	Screenshot 2026-07-21 at 7.17.46 PM-xeujKwKozGKqcFLZJbgISANg9b5csP.png	image/png	310004	1496	1484	50	50
44	df 	2026-07-28 13:30:48.631+00	2026-07-28 13:30:48.631+00	/api/media/file/Screenshot%202026-07-28%20at%203.48.21%E2%80%AFPM-ZMyo8IOPr3yFezPHtRuGiZbK9Gr3C0.png	\N	Screenshot 2026-07-28 at 3.48.21 PM-ZMyo8IOPr3yFezPHtRuGiZbK9Gr3C0.png	image/png	1575303	1082	1404	50	50
45	drefe 	2026-07-28 13:36:14.341+00	2026-07-28 13:36:14.341+00	/api/media/file/Screenshot%202026-07-24%20at%202.49.20%E2%80%AFPM-xaQHsAc5EXu6hEy2DXKGugFA18sbCY.png	\N	Screenshot 2026-07-24 at 2.49.20 PM-xaQHsAc5EXu6hEy2DXKGugFA18sbCY.png	image/png	553878	1450	976	50	50
33	Peachy Reformer Wellness	2026-07-30 19:29:58.577+00	2026-07-10 19:43:58.422+00	/api/media/file/Wenton-6kHCkbzl7TfQiLZPckBaeKA6adCgk0.png	\N	Wenton-6kHCkbzl7TfQiLZPckBaeKA6adCgk0.png	image/png	47603	1941	421	50	50
34	Warszawskie Szkło	2026-07-30 19:33:32.62+00	2026-07-10 19:44:24.394+00	/api/media/file/Warszawskie%20szk%C5%82o%20-UoalhutnTWhTLoTIjsY0I8DWSTTOOA.png	\N	Warszawskie szkło -UoalhutnTWhTLoTIjsY0I8DWSTTOOA.png	image/png	104821	500	495	50	50
\.


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_posts (id, title, slug, cover_image_id, published_at, author, content, media_type, instagram_url, youtube_url, status, featured, "order", updated_at, created_at) FROM stdin;
1	Jak wybrać sedes WC? Najważniejsze informacje przed zakupem	jak-wybrac-sedes-wc-najwazniejsze-informacje-przed-zakupem	50	2026-07-31 12:00:00+00	Pro100Remont	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Zakup sedesu WC może wydawać się prostą decyzją, jednak dostępność wielu modeli sprawia, że warto wcześniej poznać ich najważniejsze cechy. Odpowiednio dobrana miska WC wpływa na komfort codziennego użytkowania, łatwość sprzątania oraz wygląd całej łazienki. Przed zakupem warto zwrócić uwagę na kilka istotnych kwestii.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Rodzaj miski WC", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Na rynku dostępne są dwa podstawowe rozwiązania – sedesy stojące oraz podwieszane.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sedes stojący", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " - to klasyczny model montowany do podłogi. Jest łatwy w instalacji i sprawdzi się zarówno w nowych łazienkach, jak i podczas remontów. Duża liczba dostępnych wzorów pozwala bez problemu dopasować go do stylu wnętrza.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"id": "6a6e1fb6f8eca33b7aa5826e", "type": "upload", "value": 52, "fields": null, "format": "", "version": 3, "relationTo": "media"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sedes podwieszany", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " - mocowany jest do stelaża podtynkowego, dzięki czemu wszystkie elementy instalacji pozostają ukryte. Takie rozwiązanie nadaje łazience nowoczesny wygląd, ułatwia mycie podłogi i pozwala optycznie powiększyć pomieszczenie. Wymaga jednak odpowiednio przygotowanej zabudowy.Sposób spłukiwania", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"id": "6a6e1fc3f8eca33b7aa5826f", "type": "upload", "value": 51, "fields": null, "format": "", "version": 3, "relationTo": "media"}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Nowoczesne toalety coraz częściej wyposażone są w system oszczędnego spłukiwania z dwoma przyciskami. Pozwala on wybrać mniejszą lub większą ilość wody, co przekłada się na niższe rachunki oraz mniejsze zużycie wody.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Materiał wykonania", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Najczęściej spotykane są modele wykonane z ceramiki sanitarnej. Materiał ten jest odporny na uszkodzenia, łatwy do utrzymania w czystości i zachowuje estetyczny wygląd przez wiele lat. W większości łazienek najlepiej sprawdzają się białe miski WC, które pasują zarówno do nowoczesnych, jak i klasycznych aranżacji.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wysokość montażu", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Dla komfortu użytkowania duże znaczenie ma wysokość zamontowania sedesu. Standardowo górna krawędź miski znajduje się ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "około 40–42 cm nad gotową podłogą", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": ". ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"id": "6a6e2298f8eca33b7aa58271", "type": "upload", "value": 54, "fields": null, "format": "", "version": 3, "relationTo": "media"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "W domach zamieszkiwanych przez osoby starsze lub wysokie często stosuje się montaż na wysokości ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "45–48 cm", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": ", co ułatwia siadanie i wstawanie.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Kształt i wymiary", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Przed zakupem warto sprawdzić wymiary łazienki oraz ilość dostępnego miejsca. W niewielkich pomieszczeniach dobrze sprawdzają się krótsze modele, natomiast w większych można zdecydować się na bardziej rozbudowane miski o wydłużonym kształcie.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Warto również zwrócić uwagę na deskę sedesową. Modele z funkcją ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "wolnego opadania (Soft Close)", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " zapobiegają głośnemu zamykaniu i zwiększają komfort codziennego użytkowania.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Wygląd ma znaczenie", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Sedes powinien tworzyć spójną całość z pozostałym wyposażeniem łazienki. W nowoczesnych wnętrzach najczęściej wybierane są proste, podwieszane modele o geometrycznych kształtach. Do klasycznych aranżacji lepiej pasują tradycyjne miski stojące z zaokrąglonymi liniami.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "center", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Podsumowanie", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Podczas wyboru sedesu WC warto zwrócić uwagę nie tylko na jego wygląd, ale także na sposób montażu, system spłukiwania, materiał wykonania oraz wygodę użytkowania. Dobrze dobrany model będzie funkcjonalny, łatwy do utrzymania w czystości i posłuży bezproblemowo przez wiele lat.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	none	\N	\N	published	f	0	2026-08-01 16:49:38.412+00	2026-07-31 15:38:13.533+00
\.


--
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partners (id, name, logo_id, website, status, "order", updated_at, created_at, description_pl, description_en, description_uk, description_ru) FROM stdin;
3	Warszawskie Szkło	34	https://szklarzwarszawa.com/kontakt/	active	3	2026-08-14 12:07:50.038+00	2026-07-08 21:50:57.148+00	Warszawskie Szkło to firma specjalizująca się w wykonywaniu indywidualnych aranżacji szklanych oraz elementów wyposażenia wnętrz ze szkła płaskiego.\n\nW ofercie znajdują się m.in. lustra klasyczne i kolorowe, lustra w ramach, szkło lakierowane, szkło z grafiką oraz różnego rodzaju rozwiązania szklane dopasowane do indywidualnych potrzeb klienta.\n\nDzięki doświadczeniu oraz dbałości o precyzję wykonania Warszawskie Szkło realizuje zarówno pojedyncze elementy dekoracyjne, jak i kompleksowe rozwiązania szklane do mieszkań, domów, lokali usługowych oraz przestrzeni komercyjnych.\n\nKażda realizacja może zostać dopasowana pod względem wymiarów, kolorystyki, rodzaju wykończenia oraz charakteru wnętrza, dzięki czemu szkło staje się nie tylko funkcjonalnym elementem wyposażenia, ale również ważnym elementem aranżacji.	Warszawskie Szkło is a company specializing in the production of custom glass solutions and interior elements made from flat glass.\n\nTheir offer includes classic and colored mirrors, framed mirrors, lacquered glass, glass with printed graphics, as well as various other glass elements tailored to individual customer requirements.\n\nWith experience and attention to detail, Warszawskie Szkło delivers both individual decorative elements and comprehensive glass solutions for apartments, houses, commercial premises and public spaces.\n\nEach project can be individually customized in terms of dimensions, color, finish and interior style, making glass not only a functional part of the space but also an important element of its overall design.	Warszawskie Szkło — компанія, що спеціалізується на виготовленні індивідуальних скляних рішень та елементів інтер’єру з листового скла.\n\nВ асортименті представлені класичні та кольорові дзеркала, дзеркала в рамах, лаковане скло, скло з графікою, а також інші види скляних елементів, виготовлених відповідно до індивідуальних потреб клієнта.\n\nЗавдяки досвіду та увазі до деталей Warszawskie Szkło реалізує як окремі декоративні елементи, так і комплексні скляні рішення для квартир, будинків, комерційних приміщень та громадських просторів.\n\nКожен проєкт може бути індивідуально адаптований за розмірами, кольором, типом оздоблення та стилем інтер’єру, завдяки чому скло стає не лише функціональним елементом простору, а й важливою частиною його дизайну.	Warszawskie Szkło — компания, специализирующаяся на изготовлении индивидуальных стеклянных решений и элементов интерьера из плоского стекла.\n\nВ ассортименте представлены классические и цветные зеркала, зеркала в рамах, лакированное стекло, стекло с графикой, а также другие виды стеклянных элементов, изготовленных с учётом индивидуальных потребностей клиента.\n\nБлагодаря опыту и вниманию к деталям Warszawskie Szkło реализует как отдельные декоративные элементы, так и комплексные стеклянные решения для квартир, домов, коммерческих помещений и общественных пространств.\n\nКаждый проект может быть индивидуально адаптирован по размерам, цвету, типу отделки и стилю интерьера, благодаря чему стекло становится не только функциональной частью пространства, но и важным элементом его дизайна.
1	Wenton	33	https://www.wenton.com.pl/	active	1	2026-08-14 12:09:17.002+00	2026-07-08 21:42:19.751+00	Wenton to firma specjalizująca się w profesjonalnym montażu i instalacji systemów klimatyzacji w obiektach mieszkalnych, komercyjnych oraz przemysłowych.\n\nRealizują instalacje klimatyzacyjne w lokalach użytkowych, domach jednorodzinnych, hotelach, centrach handlowych, restauracjach oraz biurach.\n\nFirma posiada również doświadczenie w realizacji bardziej wymagających instalacji, obejmujących hale produkcyjne, obiekty przemysłowe oraz magazyny, gdzie odpowiedni dobór i prawidłowy montaż systemu klimatyzacji mają kluczowe znaczenie dla komfortu i efektywności użytkowania obiektu.\n\nDzięki doświadczeniu i indywidualnemu podejściu do każdego projektu Wenton dobiera rozwiązania odpowiednie do specyfiki danego obiektu, zapewniając profesjonalne wykonanie oraz sprawną realizację instalacji.	Wenton specializes in the professional installation of air conditioning and climate control systems for residential, commercial and industrial properties.\n\nThe company provides air conditioning installations in commercial premises, private houses, hotels, shopping centers, restaurants and offices.\n\nWenton also has experience in more demanding projects, including production facilities, industrial buildings and warehouses, where proper system selection and professional installation are essential for comfort, efficiency and reliable operation.\n\nWith extensive experience and an individual approach to every project, Wenton selects solutions tailored to the specific requirements of each property, ensuring professional workmanship and efficient installation.	Wenton — компанія, що спеціалізується на професійному монтажі та встановленні систем кондиціонування у житлових, комерційних та промислових об’єктах.\n\nКомпанія виконує монтаж систем кондиціонування у комерційних приміщеннях, приватних будинках, готелях, торгових центрах, ресторанах та офісах.\n\nТакож Wenton має досвід реалізації складніших проєктів, зокрема виробничих цехів, промислових об’єктів та складських приміщень, де правильний підбір і професійний монтаж кліматичного обладнання мають ключове значення для комфорту та ефективної експлуатації об’єкта.\n\nЗавдяки досвіду та індивідуальному підходу до кожного проєкту Wenton підбирає рішення відповідно до специфіки конкретного об’єкта, забезпечуючи професійне виконання та якісний монтаж.	Wenton — компания, специализирующаяся на профессиональном монтаже и установке систем кондиционирования в жилых, коммерческих и промышленных объектах.\n\nКомпания выполняет монтаж систем кондиционирования в коммерческих помещениях, частных домах, отелях, торговых центрах, ресторанах и офисах.\n\nТакже Wenton имеет опыт реализации более сложных проектов, включая производственные цеха, промышленные объекты и складские помещения, где правильный подбор и профессиональный монтаж климатического оборудования имеют ключевое значение для комфорта и эффективной эксплуатации объекта.\n\nБлагодаря опыту и индивидуальному подходу к каждому проекту Wenton подбирает решения с учётом специфики конкретного объекта, обеспечивая профессиональное исполнение и качественный монтаж.
2	AVP Group 	29	https://avpgroup.pl/index.php?route=common/home&srsltid=AfmBOoqqkbkDjIJGdsBjyPaMJzLixcaNCEZj4MXIU1Es2b0zJWfrQHP_	active	2	2026-08-14 12:14:48.279+00	2026-07-08 21:50:37.809+00	AVP Group to doświadczony integrator systemów bezpieczeństwa i nowoczesnych technologii, specjalizujący się w projektowaniu oraz wdrażaniu kompleksowych rozwiązań dla domów, firm i obiektów komercyjnych.\n\nFirma zajmuje się m.in. projektowaniem i instalacją systemów monitoringu, kontroli dostępu oraz inteligentnych rozwiązań technologicznych, dostosowanych do indywidualnych potrzeb i specyfiki danego obiektu.\n\nPonad 10 lat doświadczenia w realizacji projektów technologicznych pozwala AVP Group skutecznie łączyć nowoczesne technologie, funkcjonalność oraz bezpieczeństwo.	AVP Group is an experienced security systems and technology integrator, specializing in the design and implementation of comprehensive solutions for homes, businesses and commercial properties.\n\nThe company provides video surveillance, access control and smart technology solutions, tailored to the individual needs and specific requirements of each property.\n\nWith over 10 years of experience in delivering technology projects, AVP Group effectively combines modern technologies, functionality and security to create reliable and well-designed solutions.	AVP Group — досвідчений інтегратор систем безпеки та сучасних технологій, що спеціалізується на проєктуванні та впровадженні комплексних рішень для будинків, компаній і комерційних об’єктів.\n\nКомпанія займається проєктуванням та встановленням систем відеоспостереження, контролю доступу та інтелектуальних технологічних рішень, адаптованих до індивідуальних потреб і специфіки кожного об’єкта.\n\nПонад 10 років досвіду у реалізації технологічних проєктів дозволяють AVP Group ефективно поєднувати сучасні технології, функціональність та безпеку.	AVP Group — опытный интегратор систем безопасности и современных технологий, специализирующийся на проектировании и внедрении комплексных решений для домов, компаний и коммерческих объектов.\n\nКомпания занимается проектированием и установкой систем видеонаблюдения, контроля доступа и интеллектуальных технологических решений, адаптированных к индивидуальным потребностям и особенностям каждого объекта.\n\nБолее 10 лет опыта в реализации технологических проектов позволяют AVP Group эффективно сочетать современные технологии, функциональность и безопасность.
4	Poseydon Osuszanie	49	https://poseydon.pl/	active	4	2026-08-14 12:09:46.963+00	2026-08-01 15:53:49.158+00	POSEYDON - Specjalizują się w profesjonalnym osuszaniu obiektów po zalaniach, dezynfekcji, ozonowaniu oraz kompleksowej likwidacji skutków szkód zalaniowych.\nW przypadku likwidacji szkody za pośrednictwem POSEYDON oferują bezpłatną wizytę ofertową, podczas której przeprowadzają ocenę sytuacji i proponują najbardziej odpowiednie oraz uzasadnione rozwiązania. \n\nCelem jest przede wszystkim skuteczne ograniczenie skutków zalania, zabezpieczenie obiektu oraz minimalizacja dalszych strat.\nDzięki wieloletniemu doświadczeniu, specjalistycznej wiedzy oraz profesjonalnemu zapleczu technicznemu realizują działania indywidualnie dopasowane do charakteru i zakresu szkody – szybko, skutecznie i zgodnie z wymaganiami towarzystw ubezpieczeniowych.\n\nPOSEYDON działa na terenie województwa mazowieckiego oraz województw ościennych, zapewniając kompleksowe wsparcie na każdym etapie procesu likwidacji szkody.	POSEYDON specializes in professional water damage restoration, structural drying, disinfection, ozone treatment and comprehensive remediation of water damage.\n\nWhen handling a claim through POSEYDON, clients receive a completely free on-site assessment. During the visit, specialists evaluate the condition of the property and recommend the most appropriate and justified solutions. The main goal is to minimize the effects of water damage, prevent further deterioration and reduce potential losses.\n\nWith years of experience, professional expertise and specialized equipment, the company provides tailored solutions based on the nature and extent of each individual case — efficiently, quickly and in accordance with the requirements of insurance companies.\n\nPOSEYDON operates throughout the Masovian Voivodeship and neighboring regions, providing comprehensive support at every stage of the water damage restoration process.	POSEYDON - Компанія спеціалізується на професійному осушенні приміщень після затоплень, дезінфекції, озонуванні та комплексній ліквідації наслідків затоплень.\n\nУ випадку ліквідації збитків через POSEYDON надається повністю безкоштовний виїзд спеціаліста, під час якого проводиться оцінка ситуації та пропонуються найбільш відповідні й обґрунтовані рішення. Основна мета — ефективно мінімізувати наслідки затоплення, запобігти подальшому пошкодженню об’єкта та зменшити можливі збитки.\n\nЗавдяки багаторічному досвіду, професійним знанням та спеціалізованому обладнанню компанія пропонує рішення, індивідуально адаптовані до характеру та масштабу пошкоджень — швидко, ефективно та відповідно до вимог страхових компаній.\n\nPOSEYDON працює на території Мазовецького воєводства та сусідніх воєводств, забезпечуючи комплексну підтримку на кожному етапі ліквідації наслідків затоплення.	POSEYDON - Компания специализируется на профессиональной сушке помещений после затоплений, дезинфекции, озонировании и комплексной ликвидации последствий затоплений.\n\nВ случае ликвидации ущерба через POSEYDON предоставляется полностью бесплатный выезд специалиста, в рамках которого проводится оценка ситуации и предлагаются наиболее подходящие и обоснованные решения. Основная цель — эффективно минимизировать последствия затопления, предотвратить дальнейшее повреждение объекта и снизить возможные убытки.\n\nБлагодаря многолетнему опыту, профессиональным знаниям и специализированному оборудованию компания предлагает решения, индивидуально адаптированные к характеру и масштабу повреждений — быстро, эффективно и в соответствии с требованиями страховых компаний.\n\nPOSEYDON работает на территории Мазовецкого воеводства и соседних воеводств, обеспечивая комплексную поддержку на каждом этапе ликвидации последствий затопления.
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, title, slug, category, description, featured, status, "order", updated_at, created_at) FROM stdin;
3	Kitchen	modern-kitchen-renovation	commercial	just trying it out	t	published	0	2026-06-03 20:05:58.075+00	2026-05-28 11:54:26.985+00
2	Denis	residencial	residential	Here will be displayed the projects that pro100 remont has done over the years.	t	published	0	2026-06-25 09:11:15.304+00	2026-05-23 04:54:32.919+00
1	Romana	basement-conversion	commercial	Hello! nice job	t	published	0	2026-06-25 09:11:27.093+00	2026-05-22 17:46:41.527+00
4	tryyyyy5	Remodeling	commercial	rwe hyj ukuk. fef j rh bbd 	t	published	0	2026-06-25 09:11:44.334+00	2026-06-03 20:08:26.716+00
\.


--
-- Data for Name: quote_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quote_requests (id, full_name, email, phone, renovation_type, work_description, status, owner_reminder_date, internal_notes, updated_at, created_at, interested_in, renovation_object, start_date, location, additional_comments, reminder_sent_at) FROM stdin;
6	Stefania	whois@gmail.con	+380745817265	refresh	65	new	2026-05-12 12:00:00+00	\N	2026-05-13 10:34:50.08+00	2026-05-13 10:22:36.35+00	renovation	apartment	2027-02-10 00:00:00+00	Lublin	Hello beauty!	2026-05-13 10:34:49.885+00
5	Veronica	human@gmail.com	+380677628174	turnkeyWithProject	76	new	2026-05-15 12:00:00+00	\N	2026-05-17 07:57:29.965+00	2026-05-12 11:36:51.067+00	renovation	serviceSpace	2027-10-10 00:00:00+00	Warsaw	Hello world	2026-05-17 07:57:29.646+00
2	Denys Kaponkin	denyskaponkin@gmail.com	+48796444113	turnkeyNoProject	150	new	2026-05-14 12:00:00+00	\N	2026-05-17 07:57:30.654+00	2026-05-11 15:45:15.693+00	renovation	serviceSpace	2027-01-01 00:00:00+00	Warszawa	qweeewqweqwasas	2026-05-17 07:57:30.367+00
7	Jack Daniel	dave@gmail.com	2385003445	repairs	104	new	\N	\N	2026-05-28 11:42:25.701+00	2026-05-28 11:42:25.7+00	renovation	office	2026-12-12 00:00:00+00	Warsaw	Hi there!	\N
8	Steven Rain	steve@gmail.com	+380238947	turnkeyWithProject	200	new	\N	\N	2026-05-28 11:43:53.774+00	2026-05-28 11:43:53.774+00	newConstruction	serviceSpace	2027-06-06 00:00:00+00	Mokotow	testing # 20002	\N
9	David	difjdf@gmail.com	+380677628174	turnkeyWithProject	34	new	\N	\N	2026-06-16 12:15:59.672+00	2026-06-16 12:15:59.668+00	renovation	office	2026-06-26 00:00:00+00	Warsaw	Hello hi how are you	\N
10	Romana SV	solo.rv95@gmail.com	+48796444113	refresh	56mww2	new	\N	\N	2026-06-16 14:32:56.045+00	2026-06-16 14:32:56.044+00	renovation	apartment	2026-06-26 00:00:00+00	Warsaw	Try #45596060	\N
11	Romana SV	solo.rv95@gmail.com	+380677628174	refresh	frg juj sdf 	new	\N	\N	2026-06-16 14:56:34.383+00	2026-06-16 14:56:34.381+00	renovation	house	2026-06-25 00:00:00+00	Warsaw	skd etir eag 	\N
12	Jessica	twoij@gmail.com	+380238947	refresh	sdef 	new	\N	\N	2026-06-18 19:33:43.693+00	2026-06-18 19:33:43.687+00	renovation	house	2026-06-25 00:00:00+00	Warszawa		\N
13	This b. V	cjfxvi@mail.com	+380735811685	repairs		new	\N	\N	2026-07-11 00:42:37.242+00	2026-07-11 00:42:37.24+00	renovation	bathroom	2026-10-16 00:00:00+00	Lublin		\N
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (id, name, location, rating, comment, original_language, photo_id, status, featured, internal_notes, updated_at, created_at, translations_en, translations_pl, translations_uk, translations_ru, video_id, google_review_url, video_source, instagram_url, instagram_poster_id) FROM stdin;
3	Romana	Lublin	4	Hello World? First try here	en	\N	approved	t	\N	2026-05-18 20:48:41.136+00	2026-05-18 20:48:23.187+00	\N	\N	\N	\N	\N	\N	none	\N	\N
2	Romana	Warsaw	5	hi there! great work	en	\N	approved	t	\N	2026-05-18 20:48:52.442+00	2026-05-18 20:40:34.347+00	\N	\N	\N	\N	\N	\N	none	\N	\N
1	Jessica	Warsaw	4	Hello! It has been great working with you	en	\N	approved	t	\N	2026-05-18 20:49:14.578+00	2026-05-18 20:36:04.908+00	\N	\N	\N	\N	\N	\N	none	\N	\N
4	Jen	Lublin	5	Testing translation here.	en	\N	approved	t	\N	2026-05-19 15:29:53.571+00	2026-05-19 15:28:32.787+00	Boooooo, no t dfjd	czesc, siemanko	hody siudy akdo 	fgjf spodw eiivf sof 	\N	\N	none	\N	\N
6	Sarra	Warsaw	5	Incredible services. Astonishing.	en	\N	approved	f	\N	2026-05-19 16:53:18.249+00	2026-05-19 16:52:54.271+00	\N	\N	\N	\N	\N	\N	none	\N	\N
5	Steven	Praga	5	What an incredible service! Highly recommend.	en	\N	approved	f	\N	2026-05-19 16:53:33.088+00	2026-05-19 16:46:09.318+00	\N	\N	\N	\N	\N	\N	none	\N	\N
7	bhhijoi	hjhi oop	5	hoi0o iihggyuopnjioon	en	\N	approved	f	\N	2026-07-10 19:27:50.584+00	2026-05-25 20:31:45.407+00	\N	\N	\N	\N	\N	\N	none	\N	\N
9	Work Done	Warsaw	5	Great work	en	\N	approved	t	\N	2026-07-10 19:17:12.641+00	2026-07-10 19:17:12.64+00	\N	\N	\N	\N	\N	\N	none	\N	\N
8	Anastasia	New York	5	incredible work services!	en	\N	approved	f	\N	2026-05-28 11:45:20.608+00	2026-05-28 11:45:03.315+00	\N	\N	\N	\N	\N	\N	none	\N	\N
10	Tuvbkok.	Gunk.	5	Hi k m a cd jk l ch k n k	en	\N	approved	t	\N	2026-07-18 17:52:25.391+00	2026-07-11 00:45:07.145+00	\N	\N	\N	\N	39	\N	none	\N	\N
11	Vika	Lublin	5	Great Services	en	\N	approved	t	\N	2026-07-18 21:20:27.318+00	2026-07-18 21:20:27.318+00	\N	\N	\N	\N	40	\N	none	\N	\N
12	Stars	Warszawa	5	djfo re	en	\N	approved	t	\N	2026-07-18 21:22:08.011+00	2026-07-18 21:22:08.01+00	\N	\N	\N	\N	41	\N	none	\N	\N
13	huba buba	stay	5	sd f	en	\N	approved	t	\N	2026-07-18 21:23:34.307+00	2026-07-18 21:23:34.307+00	\N	\N	\N	\N	42	\N	none	\N	\N
14	gvbgr	rfrgtr hr	5	fvvgfbh tmutdz fcd	en	\N	approved	f	\N	2026-07-21 17:13:29.243+00	2026-07-18 21:24:35.165+00	\N	\N	\N	\N	\N	\N	none	\N	\N
17	DAR SPORT SPACE	Mokotow	5	3ekdfkd 	pl	56	approved	f	Kolejna bardzo miła opinia od naszego klienta.\nDziękujemy za współprace i zapraszamy wszystkich do @dar.space.waw	2026-08-01 17:16:33.122+00	2026-07-28 13:32:32.365+00	\N	\N	\N	\N	58	\N	upload	\N	\N
16	white	Lublin	5	2ew2v e vgert 42	en	\N	approved	f	\N	2026-09-23 16:00:59.607+00	2026-07-24 11:28:16.852+00	\N	\N	\N	\N	57	\N	upload	\N	\N
15	Grey	Warsaw	5	htyy tr v	en	\N	approved	f	\N	2026-09-23 16:01:20.989+00	2026-07-24 11:27:48.726+00	\N	\N	\N	\N	40	\N	upload	\N	\N
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.services (id, title, slug, featured, status, "order", updated_at, created_at) FROM stdin;
1	Montaż (łazienka)	montaż-łazienka	f	published	5	2026-06-11 21:17:59.212+00	2026-05-23 05:21:25.421+00
6	Montaż - inne	montaż-inne	f	published	6	2026-06-11 21:19:13.093+00	2026-06-11 20:56:02.861+00
5	Elektryka i Hydraulika	elektryka-i-hydraulika	f	published	1	2026-06-13 12:26:43.108+00	2026-06-03 20:07:53.524+00
2	Prace glazurnicze	prace-glazurnicze	t	published	4	2026-06-13 12:30:08.068+00	2026-05-23 05:27:18.567+00
4	Prace malarskie	prace-malarskie	t	published	2	2026-06-13 12:31:11.523+00	2026-05-28 11:56:51.182+00
3	Instalacje G-K	instalacje-g-k	f	published	3	2026-06-13 12:31:53.68+00	2026-05-23 05:42:43.617+00
\.


--
-- Data for Name: trusted_brands; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.trusted_brands (id, name, mark, logo_id, href, status, "order", updated_at, created_at, description_pl, description_en, description_uk, description_ru, website, featured_project_id, project_preview_image_id) FROM stdin;
3	GrindHouse Gym	GHG	30	/projects#grind-house-gym	published	3	2026-07-10 19:42:39.001+00	2026-06-22 19:46:03.144+00	\N	\N	\N	\N	\N	\N	\N
4	Manaland	M	31	/projects#manaland	published	4	2026-07-10 19:43:01.596+00	2026-06-22 19:46:37.89+00	\N	\N	\N	\N	\N	\N	\N
8	SKILL | Shaurma, Kebab, Grill  	SSKG	35	/projects#skill-shaurma-kebab-grill	published	8	2026-07-10 19:45:16.611+00	2026-06-22 19:48:30.697+00	\N	\N	\N	\N	\N	\N	\N
6	Peachy Reformer Wellness  	PRW	47	/projects#peachy-reformer-wellness	published	6	2026-07-31 20:29:01.317+00	2026-06-22 19:47:39.81+00	\N	\N	\N	\N	\N	\N	\N
1	Dar Sport Space	DS	25	/projects#dar-sport-space	published	1	2026-08-05 11:19:11.003+00	2026-06-22 19:30:06.027+00	dcfdsfvd g h d	scxsac hthetge	\N	\N	https://www.muchabud.com/	2	18
2	Element	El	46	/projects#element	published	2	2026-08-08 16:16:43.917+00	2026-06-22 19:45:17.265+00	Element - to realizacja wielkich ambicji dwóch kreatywnych dziewczyn, które pracując w branży beauty jednego dnia postanowiły, że razem one mogą stworzyć coś znacznego. To ciekawe pomysły, oryginalne idee, wiedza o jakości obsługi klienta i chęć do rozwoju. ELEMENT jest przystanią odpoczynku i piękna do którego chce się wracać. Ciepła atmosfera oraz profesjonalizm sprawiają, że zaufało im ponad 2000 klientów.  \n\nPRACUJĄ 7 DNI W TYGODNIU\n\nświadczą usługi w 2, 4 i nawet 6 rąk \n3 usługi w 1 godzinę 	\N	\N	\N	https://www.instagram.com/element.warsaw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==	\N	\N
9	The Sadovsky Barbershop  	TSB	36	/projects#the-sadovsky-barbershop	published	9	2026-08-08 16:19:26.471+00	2026-06-22 19:48:55.653+00	Pierwszy salon The Sadovsky Barbershop został otwarty w 2019 roku w Rzeszowie\nSpecjalizują się w męskim strzyżeniu włosów, pielęgnacji brody, goleniu twarzy oraz brody. \nSwoim klientom na wejściu oferujemy szklankę whiskey, jazz, a przede wszystkim usługę idealnie dobraną do ich potrzeb, która przerośnie ich oczekiwania.\nBarberzy THE Sadovsky to pasjonaci, mistrzowie swojego fachu, rzemieślnicy sztuki barberingu, którzy stale udoskonalają swoje umiejętności, by każdy klient mógł cieszyć się perfekcyjną fryzurą oraz idealną brodą, niezależnie od jej długości.	\N	\N	\N	https://www.instagram.com/thesadovsky_warszawa/	\N	\N
5	Marinero Hair 	 MH	32	/projects#marinero-hair	published	5	2026-08-08 16:21:25.119+00	2026-06-22 19:47:12.031+00	"Marinero Hair to marka stworzona z miłości i pasji do włosów przez Karola Żeglińskiego - fryzjera/stylistę. Team Marinero Hair to zawodowcy cechujący się otwartością, kreatywnością i dbałością o każdy nawet drobny szczegół. \n\n Najważniejsze dla teamu Marinero Hair jest spełnienie Waszych oczekiwań, uśmiech na twarzy i najwyższa jakość świadczonych usług."	\N	\N	\N	https://www.instagram.com/marinero_hair?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==	\N	\N
7	Premium Ikra  	PI	48	/projects#premium-ikra	published	7	2026-08-08 16:22:38.038+00	2026-06-22 19:48:06.084+00	Głównym celem jest - premium jakość .\n\nNie pracują z produkcją niskiej lub średniej jakości, \nTylko z produktem premium i indywidualnie dobierają kawior zgodnie z preferencjami smakowymi każdego klienta. Jeśli lubisz wysokiej jakości kawior, to dobrze trafiłeś!\n\nSklep PREMIUM IKRA  posiada duży asortyment owoców morza: wszelkiego rodzaju kawior czerwony i czarny, kawior szczupakowy, mięso kraba kamczackiego, wiele rodzajów krewetek, wątróbkę dorsza i wiele innych.	\N	\N	\N	https://www.instagram.com/premium.ikra.pl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	2026-05-09 13:10:49.262+00	2026-05-09 13:10:49.261+00	solo.rv95@gmail.com	\N	\N	8242c6f830d7bad1a08f2a63a8f21e277c07bf37644d0ae4d5f83f3207295590	370fc5752e12ab948a2fe7b0a696d394678a18fa772094e9d60d5092a18cf1cb51e885270ecd5e8b6a0a12c6e39f7fb86789c6bf5413d2a2dcc3e9ea01f755294ae730892971282957e7b2feda5e17ff551b46a44ac1ac27b71947553a7953663be3f36c98483fc714ef951fb783a9132b81018937b37444f108e1821f365b9d663036a1f12de98d453eb2fdff18e992b1827000ded29fdc1458e81c6b6173e1b036170b7c831549d09c2647f1bbcd11d71444a649b02bd161136ca2baff1f3d0b70ad2d7c918d817dabb5d8553ac30baf1d46119f051f9f17de7bbe960c8911a544450779813d4e905c3ad13bb94d900227f873be109902a2e1332e409f503e12747e105e393fb04e62aab85213b5521de83262e7ecdd6936af6523d1cb5878e01a1aa4abc431f848e81f26c89e7007df1e8bf36440954ff07c8692ad24b5574527f9a1089b23e5a590658425bee93c5fdfbc3c9bf0c58db8da875909dd0b617154937d5d88323819db8a947b44c33fa9ffe1b1e500240552a644f6977d6677464e735c860cab713c79ab4483b9c0d9847555c65d6ce2e2b968cb86f8f01dc80dcd81fd1e8f5c345863299709936b2625bd655fd19e2b57be866212fe3bcbd12de4d6b7f7ca3e5de1e4b3de8e8b6f3526813d80720c4a584760e53a4739a16012db24f4b7787eda6c65c615394f6297176b52a3e30f41f18847cb2a7137bd47	0	\N
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, quote_requests_id, reviews_id, projects_id, services_id, trusted_brands_id, partners_id, blog_posts_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-09-15 09:52:46.262+00	2026-05-09 13:04:04.187+00
2	20260511_131234	1	2026-09-23 18:48:41.636+00	2026-09-23 18:48:41.636+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
1	collection-quote-requests	{"limit": 10, "editViewType": "default"}	2026-05-09 17:34:49.895+00	2026-05-09 14:27:50.595+00
2	collection-media	{"limit": 10, "editViewType": "default"}	2026-05-11 16:16:14.26+00	2026-05-09 14:33:34.803+00
4	collection-users	{}	2026-05-12 09:11:55.247+00	2026-05-12 09:11:55.245+00
6	collection-reviews	{"limit": 10}	2026-05-18 20:30:02.974+00	2026-05-18 20:30:02.973+00
7	collection-reviews	{"limit": 10}	2026-05-18 20:30:02.981+00	2026-05-18 20:30:02.981+00
5	collection-reviews	{"limit": 10, "editViewType": "default"}	2026-05-18 20:31:24.601+00	2026-05-18 20:29:30.064+00
8	collection-projects	{"editViewType": "default"}	2026-05-22 17:46:11.647+00	2026-05-22 17:46:00.655+00
10	collection-services	{"limit": 10}	2026-05-23 05:23:36.021+00	2026-05-23 05:23:36.021+00
12	collection-services	{"limit": 10}	2026-05-23 05:23:36.015+00	2026-05-23 05:23:36.015+00
11	collection-services	{"sort": "order", "limit": 10}	2026-06-11 21:03:06.004+00	2026-05-23 05:23:36.062+00
9	collection-services	{"sort": "order", "limit": 10, "editViewType": "default"}	2026-06-13 12:11:24.232+00	2026-05-23 05:20:01.726+00
13	collection-trusted-brands	{"sort": "order", "limit": 10, "editViewType": "default"}	2026-06-22 19:45:23.402+00	2026-06-22 19:29:28.735+00
14	collection-partners	{"limit": 10, "editViewType": "default"}	2026-07-08 21:41:58.253+00	2026-07-08 21:40:53.853+00
15	collection-blog-posts	{"limit": 10, "editViewType": "default"}	2026-07-31 19:59:57.952+00	2026-07-31 15:29:57.894+00
3	nav	{"open": true, "groups": {"Business": {"open": true}}}	2026-08-05 16:27:46.285+00	2026-05-11 15:30:48.758+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
4	\N	1	user	1
8	\N	2	user	1
9	\N	4	user	1
14	\N	6	user	1
15	\N	7	user	1
16	\N	5	user	1
18	\N	8	user	1
23	\N	10	user	1
25	\N	12	user	1
30	\N	11	user	1
31	\N	9	user	1
34	\N	13	user	1
45	\N	14	user	1
48	\N	15	user	1
52	\N	3	user	1
\.


--
-- Data for Name: projects_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects_rels (id, "order", parent_id, path, media_id) FROM stdin;
33	1	2	galleryImages	18
42	3	4	galleryImages	18
\.


--
-- Data for Name: quote_requests_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quote_requests_rels (id, "order", parent_id, path, media_id) FROM stdin;
\.


--
-- Data for Name: services_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.services_items (_order, _parent_id, id, name, price, "order") FROM stdin;
1	1	6a2b209ce740352712dc2bda	Odpływ liniowy walk-in	1200 zł/szt	1
2	1	6a2b25665408036cbc7c266d	Bateria umywalkowa	150 zł/szt	2
3	1	6a2b25755408036cbc7c266f	Bateria umywalkowa podtynkowa 	200 zł/szt	3
4	1	6a2b25855408036cbc7c2671	Geberit + stelaż standard	750 zł/szt	4
5	1	6a2b25945408036cbc7c2673	Montaż miski WC	200 zł/szt	5
6	1	6a2b25a65408036cbc7c2675	Umywalka	250 zł/szt	6
7	1	6a2b25b55408036cbc7c2677	Kabina prysznicowa	500 zł/szt	7
8	1	6a2b25c45408036cbc7c2679	Brodzik	350 zł/szt	8
9	1	6a2b25d25408036cbc7c267b	Wanna + zabudowa standard	1200 zł/szt	9
10	1	6a2b25e25408036cbc7c267d	Bateria prysznicowa 	250 zł/szt	10
11	1	6a2b25f25408036cbc7c267f	Bateria prysznicowa podtynkowa	500 zł/szt	11
1	6	6a2b20cae740352712dc2bdc	Przygotowanie do montażu drzwi 	600 zł	1
2	6	6a2b26125408036cbc7c2681	Drzwi zwykłe	500 zł/szt	2
3	6	6a2b262f5408036cbc7c2683	Drzwi ukrytego montażu	1000 zł/szt	3
4	6	6a2b263e5408036cbc7c2685	Parapet	150 zł/mb	4
1	5	6a2b1f37c08da4a3361a9e7f	Montaż punktu elektrycznego	150 zł/punkt	1
2	5	6a2b21b95408036cbc7c2627	Taśma LED	50 zł/mb	2
3	5	6a2b21c65408036cbc7c2629	Biały montaż gniazda/włącznika	50 zł/szt	3
4	5	6a2b21d85408036cbc7c262b	Biały montaż lampy / kinkietu	130 zł/szt	4
5	5	6a2b21f05408036cbc7c262d	Rozdzielnia elektryczna	1200 zł/szt	5
6	5	6a2b22045408036cbc7c262f	Punkt wodny	150 zł/szt	6
7	5	6a2b22165408036cbc7c2631	Punkt kanalizacyjny	150 zł/szt	7
8	5	6a2b222e5408036cbc7c2633	Montaż zaworu i syfonu	50 zł/szt	8
9	5	6a2b22405408036cbc7c2635	Demontaż i montaż grzejnika	350 zł/szt	9
1	2	6a2b2066e740352712dc2bd8	Silikon	20 zł/mb	1
2	2	6a2b24a35408036cbc7c2657	Cięcie pod kątem 45° 	120 zł/mb	2
3	2	6a2b24ad5408036cbc7c2659	Hydroizolacja (folia w płynie) 	30 zł/m²	3
4	2	6a2b24bb5408036cbc7c265b	Szlifowanie płytek	120 zł/mb	4
5	2	6a2b24cb5408036cbc7c265d	Otwory w płytkach	50 zł/szt	5
6	2	6a2b24dd5408036cbc7c265f	Układanie płytek 30×30 / 60×120	180 zł/m²	6
7	2	6a2b24f25408036cbc7c2661	Układanie płytek 10×10 / 20×20 	200 zł/m²	7
8	2	6a2b25025408036cbc7c2663	Układanie płytek 80×80 / 120×120 	220 zł/m²	8
9	2	6a2b25185408036cbc7c2665	Układanie płytek 15×60 / 20×120	200 zł/m²	9
10	2	6a2b25285408036cbc7c2667	Fugowanie spoiną epoksydow 	55 zł/m²	10
11	2	6a2b25395408036cbc7c2669	Fugowanie spoiną cementową	40 zł/m²	11
1	4	6a2b1ff6e740352712dc2bd4	Szlifowanie ścian	18 zł/m²	1
2	4	6a2b23595408036cbc7c2639	Ubytki	35 zł/m²	2
3	4	6a2b236e5408036cbc7c263b	Bruzda	20 zł/mb	3
4	4	6a2b237e5408036cbc7c263d	Grunt	7 zk/m²	4
5	4	6a2b23915408036cbc7c263f	Betonkontakt	25 zł/m²	5
6	4	6a2b23a45408036cbc7c2641	Narożnik aluminiowy	20 zł/mb	6
7	4	6a2b23bd5408036cbc7c2643	Taśma zbrojeniowa	20 zł/m²	7
8	4	6a2b23cf5408036cbc7c2645	Gładź	42 zk/m²	8
9	4	6a2b23e05408036cbc7c2647	Akryl	20 zł/mb	9
10	4	6a2b23f25408036cbc7c2649	Malowanie	25 zk/m²	10
11	4	6a2b24025408036cbc7c264b	Tapeta	70 zk/m²	11
1	3	6a2b202fe740352712dc2bd6	Wyrównywanie ścian (stelaż)	130 zk/m²	1
2	3	6a2b243f5408036cbc7c264d	Sufit podwieszany	180 zł/mł	2
3	3	6a2b244e5408036cbc7c264f	Wyrównywanie ścian na klej	85 zł/m²	3
4	3	6a2b245e5408036cbc7c2651	Zabudowy G-K	200 zł/mb	4
5	3	6a2b246e5408036cbc7c2653	Wełna w ścianach	30 zk/m²	5
6	3	6a2b247e5408036cbc7c2655	Wełna w suficie	60 zk/m²	6
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	e173d49a-1498-40fc-bcf1-7e711395ce40	2026-09-23 15:30:30.58+00	2026-09-23 17:30:30.58+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-05-09 10:06:51
20211116045059	2026-05-09 10:06:51
20211116050929	2026-05-09 10:06:51
20211116051442	2026-05-09 10:06:51
20211116212300	2026-05-09 10:06:51
20211116213355	2026-05-09 10:06:51
20211116213934	2026-05-09 10:06:51
20211116214523	2026-05-09 10:06:51
20211122062447	2026-05-09 10:06:51
20211124070109	2026-05-09 10:06:51
20211202204204	2026-05-09 10:06:51
20211202204605	2026-05-09 10:06:51
20211210212804	2026-05-09 10:06:52
20211228014915	2026-05-09 10:06:52
20220107221237	2026-05-09 10:06:52
20220228202821	2026-05-09 10:06:52
20220312004840	2026-05-09 10:06:52
20220603231003	2026-05-09 10:06:52
20220603232444	2026-05-09 10:06:52
20220615214548	2026-05-09 10:06:52
20220712093339	2026-05-09 10:06:52
20220908172859	2026-05-09 10:06:53
20220916233421	2026-05-09 10:06:53
20230119133233	2026-05-09 10:06:53
20230128025114	2026-05-09 10:06:53
20230128025212	2026-05-09 10:06:53
20230227211149	2026-05-09 10:06:53
20230228184745	2026-05-09 10:06:53
20230308225145	2026-05-09 10:06:53
20230328144023	2026-05-09 10:06:53
20231018144023	2026-05-09 10:06:53
20231204144023	2026-05-09 10:06:53
20231204144024	2026-05-09 10:06:53
20231204144025	2026-05-09 10:06:53
20240108234812	2026-05-09 10:06:53
20240109165339	2026-05-09 10:06:53
20240227174441	2026-05-09 10:06:53
20240311171622	2026-05-09 12:29:05
20240321100241	2026-05-09 12:29:05
20240401105812	2026-05-09 12:29:05
20240418121054	2026-05-09 12:29:05
20240523004032	2026-05-09 12:29:05
20240618124746	2026-05-09 12:29:05
20240801235015	2026-05-09 12:29:05
20240805133720	2026-05-09 12:29:05
20240827160934	2026-05-09 12:29:05
20240919163303	2026-05-09 12:29:05
20240919163305	2026-05-09 12:29:05
20241019105805	2026-05-09 12:29:05
20241030150047	2026-05-09 12:29:05
20241108114728	2026-05-09 12:29:05
20241121104152	2026-05-09 12:29:05
20241130184212	2026-05-09 12:29:05
20241220035512	2026-05-09 12:29:05
20241220123912	2026-05-09 12:29:05
20241224161212	2026-05-09 12:29:05
20250107150512	2026-05-09 12:29:05
20250110162412	2026-05-09 12:29:05
20250123174212	2026-05-09 12:29:05
20250128220012	2026-05-09 12:29:05
20250506224012	2026-05-09 12:29:05
20250523164012	2026-05-09 12:29:05
20250714121412	2026-05-09 12:29:05
20250905041441	2026-05-09 12:29:05
20251103001201	2026-05-09 12:29:05
20251120212548	2026-05-09 12:29:05
20251120215549	2026-05-09 12:29:05
20260218120000	2026-05-09 12:29:05
20260326120000	2026-05-09 12:29:05
20260514120000	2026-06-09 16:00:45
20260527120000	2026-06-09 16:00:45
20260528120000	2026-06-09 16:00:45
20260603120000	2026-06-09 16:00:45
20260605120000	2026-06-25 10:25:30
20260606110000	2026-06-25 10:25:30
20260616120000	2026-06-25 10:25:30
20260624120000	2026-06-25 10:25:30
20260626120000	2026-09-23 18:39:20
20260706120000	2026-09-23 18:39:20
20260707120000	2026-09-23 18:39:20
20260709120000	2026-09-23 18:39:20
20260714120000	2026-09-23 18:39:20
20260827120000	2026-09-23 18:39:20
20260914120000	2026-09-23 18:39:20
20260916120000	2026-09-23 18:39:20
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter, selected_columns) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type, versioning_status, lifecycle_configuration, lifecycle_configuration_generation) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-05-09 10:07:27.506805
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-05-09 10:07:27.537299
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-05-09 10:07:27.540358
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-05-09 10:07:27.55917
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-05-09 10:07:27.570952
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-05-09 10:07:27.572987
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-05-09 10:07:27.575291
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-05-09 10:07:27.577692
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-05-09 10:07:27.579635
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-05-09 10:07:27.581607
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-05-09 10:07:27.584417
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-05-09 10:07:27.586748
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-05-09 10:07:27.58915
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-05-09 10:07:27.591143
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-05-09 10:07:27.593398
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-05-09 10:07:27.614821
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-05-09 10:07:27.616824
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-05-09 10:07:27.618674
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-05-09 10:07:27.620469
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-05-09 10:07:27.623568
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-05-09 10:07:27.625673
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-05-09 10:07:27.629091
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-05-09 10:07:27.639083
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-05-09 10:07:27.646341
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-05-09 10:07:27.64837
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-05-09 10:07:27.650465
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-05-09 10:07:27.652471
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-05-09 10:07:27.653984
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-05-09 10:07:27.655414
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-05-09 10:07:27.65699
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-05-09 10:07:27.65844
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-05-09 10:07:27.659942
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-05-09 10:07:27.661408
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-05-09 10:07:27.662921
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-05-09 10:07:27.664345
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-05-09 10:07:27.665819
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-05-09 10:07:27.667278
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-05-09 10:07:27.668856
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-05-09 10:07:27.671246
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-05-09 10:07:27.679006
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-05-09 10:07:27.680585
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-05-09 10:07:27.682048
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-05-09 10:07:27.683541
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-05-09 10:07:27.686367
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-05-09 10:07:27.688045
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-05-09 10:07:27.690171
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-05-09 10:07:27.69837
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-05-09 10:07:27.700965
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-05-09 10:07:27.702972
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-05-09 10:07:27.716124
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-05-09 10:07:27.718429
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-05-09 10:07:27.731691
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-05-09 10:07:27.732674
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-05-09 10:07:27.739421
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-05-09 10:07:27.740795
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-05-09 10:07:27.741793
57	s3-multipart-uploads-metadata	f127886e00d1b374fadbc7c6b31e09336aad5287	2026-05-09 10:07:27.747913
58	operation-ergonomics	00ca5d483b3fe0d522133d9002ccc5df98365120	2026-05-09 10:07:27.750096
56	fix-optimized-search-function	b823ed1e418101032fa01374edc9a436e54e3ed4	2026-05-09 10:07:27.744553
59	drop-unused-functions	38456f13e39691c2bbb4b5151d0d1cdbabd4a8c4	2026-05-11 14:13:56.016665
60	optimize-existing-functions-again	db35e1c91a9201e59f4fef8d972c2f277d68b157	2026-05-11 14:13:56.023196
61	mark-filename-immutable	fe0096517ae9d60aaec1d110172ba9036dc66bb7	2026-09-23 18:39:25.730201
62	object-versioning-core	0b855f00ff3be0bfca91efee02a9858912491a9a	2026-09-23 18:39:25.741946
63	fix-search-name-relative-to-prefix	c7485e417624f795ce8bb2da21927f48e088904d	2026-09-23 18:39:25.759116
64	fix-search-by-timestamp-sqli	0af424ecd388a39bb1645184b222185a12149675	2026-09-23 18:39:25.764378
65	objects-key-version-index	da319c4b89ba800ce795d1b699f3a70675138058	2026-09-23 18:39:25.91454
66	objects-current-version-index	191466c93aa2c46a00e36505577c5fcab8d7cb4b	2026-09-23 18:39:25.919636
67	objects-null-version-index	15bfe8c35b66642b6c78ba60060fa8793bd2207a	2026-09-23 18:39:25.924678
68	bucket-lifecycle-configuration	3c08f6f889922f399519722a932b51007c11bebc	2026-09-23 18:39:25.92545
69	validate-bucket-lifecycle-constraints	4febacaaaa0e61e2b783bef081fe03a287e65eb3	2026-09-23 18:39:25.938902
70	list-objects-with-versions	5c17c3777616cd8d7b18b82835525fa3205af57b	2026-09-23 18:39:25.94163
71	objects-delete-marker-index	6d14858e66c66f8d6accf8a2630aefd1527fddba	2026-09-23 18:39:25.961692
72	drop-bucketid-objname-index	302beb09e1b469d7d4db19566f2389d280b64aa3	2026-09-23 18:39:25.968189
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, archived_at, is_delete_marker, is_versioned) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata, metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 1, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 58, true);


--
-- Name: partners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partners_id_seq', 4, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 128, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 256, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 2, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 15, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 52, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_id_seq', 4, true);


--
-- Name: projects_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_rels_id_seq', 42, true);


--
-- Name: quote_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quote_requests_id_seq', 13, true);


--
-- Name: quote_requests_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quote_requests_rels_id_seq', 9, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reviews_id_seq', 17, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.services_id_seq', 6, true);


--
-- Name: trusted_brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.trusted_brands_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict jcXRSVKSOhiyzoWWCHjvsKvcrkipXdza6aqLJWsgk4thFWwJfLnMKWkNi2kEqdG

