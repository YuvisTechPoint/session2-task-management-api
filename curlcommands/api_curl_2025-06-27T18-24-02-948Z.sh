# https://www.reddit.com/svc/shreddit/styling-overrides/?context=local (GET) - Status: 200
curl -X GET \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"' \
  -H 'dnt: 1' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'x-api-recorder-id: cb21849f' \
  -H 'accept: */*' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://www.reddit.com/r/anime/' \
  -H 'accept-encoding: gzip, deflate, br, zstd' \
  -H 'accept-language: en-US,en;q=0.9,id;q=0.8' \
  -H 'cookie: loid=000000001rwv1p3rha.2.1750455522941.Z0FBQUFBQm9WZFRpMkNxU1F2MGJCcmFlYW9jUVVMWkNBamREZkFnOXM5YndyWUQ2N2VoRFF5T081TzdESnV1VFFxbjFjNTFtU25xWEtWNk9abTN2cEF1UlhxaHA5WmlndDBZVE5LTGVobkxkUHBQUjZDMmVuaWRRbVRESUlLTi1ab3g3aXlWbmlNS3g; csv=2; edgebucket=gqvNsqowd6z5y0UZb0; csrf_token=12d5f6191b121d87aca4aad2c5522a99; token_v2=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzUxMTM0Njk5Ljg0ODQzMSwiaWF0IjoxNzUxMDQ4Mjk5Ljg0ODQzMSwianRpIjoiNGk1VUt3QWdLd2d1T0RFdTZUZ19lU1dTbXNCLUVBIiwiY2lkIjoiMFItV0FNaHVvby1NeVEiLCJsaWQiOiJ0Ml8xcnd2MXAzcmhhIiwibGNhIjoxNzUwNDU1NTIyOTQxLCJzY3AiOiJlSnhra2RHT3REQUloZC1GYTVfZ2Y1VV9tMDF0Y1lhc0xRYW9rM243RFZvY2s3MDdjRDRwSFA5REtvcUZEQ1pYZ3FuQUJGZ1RyVERCUnVUOW5MbTNnMmlOZTh0WXNabkNCRm13RkRya21MR3NpUVFtZUpJYXl4c21vSUxOeUZ5dXRHTk5MVDBRSnFoY01yZUZIcGMyb2JrYmk1NmRHRlc1ckR5b3NWZmwwdGpHRkxZbnhqY2JxdzJwdUM2bk1rbkxRdmtzWHZUak45VzM5dm16X1NhMEo4T0txdW1CM2hsSkNHNHNmcGltM2Q5VGs1NnRDeGExOTNxUTJ1ZDYzSzU5MWl3ME83ZWY2X2xySXhtWFkyaC1KdnQzMXktaEE0ODhMelBxQUVhczRVY1pkbVFkX2xVSFVMbWdKR01KNHRNSTVNcmwyMzhKdG12VHY4YnRFejk4TS1LbU5feldETlJ6Q2VMUXBfSDFHd0FBX184UTFlVFIiLCJmbG8iOjF9.YASuskksh3jQFKggFalMgN6OVEwIoDc8L1F9_RiW138hcuK7mXYDvenJheuMRCAe31YyjTRZZppchyass5wj6WoZEWzl8bVEpSEwt4Y1eiNCgNQIdnbA_EcpQg7GLIRxwEoq3HVzNocrEg63UYOcux-IQ8l8qVlYjYVQr8KC9MZ-M71BhcJbw2AB3-9f96zEHhPhgBKuIYhvd-51yTi3VF48t5plhvQo9oFSvQk1HtRi67dERJOkRx-IooVCVFBcWtzHRO-_f7etgm2Sohxb_d59M99jpzN4RmiYd655jX9dEyF7b8j5XBjEqENnk_dk11g8bxHiKp33OANBbix41Q; session_tracker=icerihpgdrbqlgfrph.0.1751048364020.Z0FBQUFBQm9YdUNzRk9QSU9SbXJucmNGTmhkR09tZGUtTldwTUQ0UzZTbjZYVWtVS1pDeDQ3MTlFV1BuZV9BN2dvbFl0SUJOT2xxOVc5WTFVWklqY2I2N0k5bXFuZ1VhcVBsLVpONEFzYWR5NWVKdzdZa3lubWpQNy0ycWMzYjF0SW1FMTVVNnJNZkE' \
  'https://www.reddit.com/svc/shreddit/styling-overrides/?context=local'

# Response Body: []

# https://www.reddit.com/svc/shreddit/graphql (POST) - Status: 200
curl -X POST \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'x-api-recorder-id: d96da8cf' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36' \
  -H 'accept: application/json' \
  -H 'dnt: 1' \
  -H 'content-type: application/json' \
  -H 'origin: https://www.reddit.com' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://www.reddit.com/r/anime/' \
  -H 'accept-encoding: gzip, deflate, br, zstd' \
  -H 'accept-language: en-US,en;q=0.9,id;q=0.8' \
  -H 'cookie: loid=000000001rwv1p3rha.2.1750455522941.Z0FBQUFBQm9WZFRpMkNxU1F2MGJCcmFlYW9jUVVMWkNBamREZkFnOXM5YndyWUQ2N2VoRFF5T081TzdESnV1VFFxbjFjNTFtU25xWEtWNk9abTN2cEF1UlhxaHA5WmlndDBZVE5LTGVobkxkUHBQUjZDMmVuaWRRbVRESUlLTi1ab3g3aXlWbmlNS3g; csv=2; edgebucket=gqvNsqowd6z5y0UZb0; csrf_token=12d5f6191b121d87aca4aad2c5522a99; token_v2=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzUxMTM0Njk5Ljg0ODQzMSwiaWF0IjoxNzUxMDQ4Mjk5Ljg0ODQzMSwianRpIjoiNGk1VUt3QWdLd2d1T0RFdTZUZ19lU1dTbXNCLUVBIiwiY2lkIjoiMFItV0FNaHVvby1NeVEiLCJsaWQiOiJ0Ml8xcnd2MXAzcmhhIiwibGNhIjoxNzUwNDU1NTIyOTQxLCJzY3AiOiJlSnhra2RHT3REQUloZC1GYTVfZ2Y1VV9tMDF0Y1lhc0xRYW9rM243RFZvY2s3MDdjRDRwSFA5REtvcUZEQ1pYZ3FuQUJGZ1RyVERCUnVUOW5MbTNnMmlOZTh0WXNabkNCRm13RkRya21MR3NpUVFtZUpJYXl4c21vSUxOeUZ5dXRHTk5MVDBRSnFoY01yZUZIcGMyb2JrYmk1NmRHRlc1ckR5b3NWZmwwdGpHRkxZbnhqY2JxdzJwdUM2bk1rbkxRdmtzWHZUak45VzM5dm16X1NhMEo4T0txdW1CM2hsSkNHNHNmcGltM2Q5VGs1NnRDeGExOTNxUTJ1ZDYzSzU5MWl3ME83ZWY2X2xySXhtWFkyaC1KdnQzMXktaEE0ODhMelBxQUVhczRVY1pkbVFkX2xVSFVMbWdKR01KNHRNSTVNcmwyMzhKdG12VHY4YnRFejk4TS1LbU5feldETlJ6Q2VMUXBfSDFHd0FBX184UTFlVFIiLCJmbG8iOjF9.YASuskksh3jQFKggFalMgN6OVEwIoDc8L1F9_RiW138hcuK7mXYDvenJheuMRCAe31YyjTRZZppchyass5wj6WoZEWzl8bVEpSEwt4Y1eiNCgNQIdnbA_EcpQg7GLIRxwEoq3HVzNocrEg63UYOcux-IQ8l8qVlYjYVQr8KC9MZ-M71BhcJbw2AB3-9f96zEHhPhgBKuIYhvd-51yTi3VF48t5plhvQo9oFSvQk1HtRi67dERJOkRx-IooVCVFBcWtzHRO-_f7etgm2Sohxb_d59M99jpzN4RmiYd655jX9dEyF7b8j5XBjEqENnk_dk11g8bxHiKp33OANBbix41Q; session_tracker=icerihpgdrbqlgfrph.0.1751048365446.Z0FBQUFBQm9YdUN0SlYyZ2VzaldvN0Y3WXJNd2dFWmFVaC1lcXgtczQ3UTZfRmZtczRMZl9Fa2U1Tk00WWo3S2JGTGdMTUd4dDdEcWpKcDZaZjA3SUh6MzlZLWdSRXFROTc0amZhUTlUUko2VFE2X2JkM2pmRnpQQ0RxQUFWbG1CSlBTa2pOUnEtMlU' \
  -d '{"operation":"CreateCaptchaToken","variables":{"input":{"token":"03AFcWeA7QmrQdR-q7Nf1gzB9G38mLqAzGWkqirAGA_WWAS6nejJzSORWfIIeObce3V1zB1zyRGnYgTuOi-kzLLO1fkLpO3yXcoRnV-O78BXHLfx0Eb9QTegWajXS1FF64kWDoAV4wSJkD6eprtalgXgdIGzH0s8dZl9743eAwKN2gKHiUx1fF5NygbmVYXMucArPrTvtz3t-06GPVobmPsr8VUiTVDJFU02bJJXZxt_3TZ0DJmt1kjBNHglAEFCe3HzHBiJ_2wnCwAYqhcnNhHAleqkqszuLhlCfwE-CMUfHfbgCY2of5KJu86f-ghzs26eKwXIVyoA4UcD0PzV23Gq9HjfKXq2jWIuARhb-B2ZizcJqVNKUU-VdYYeWO6eKztEgeZ87Sa6v1dxjQhEENYA3foLsg_XW2AOoimkWhhITyRQwpGmuevtUTaY-70G1eZmfQcH3k95tMk3FXBwaUcLoqRLLZhH-r_OBW-1LMJDSa5L61I1vnQjjnW6-voKLh8PxwZJn4UlU8SH1-Cbfas_6-HyQJyQmZNa12QicwyKar1PNvFDgqF87vjmvUnq6jUOfzW-_Cn4bUUeAIXknmaX0IA5O5g2zFHH2Wx2zzkPxzNT7FE5WfxsXlel-dltj0h7EvJgg-pqrgrR3tcNQgKvrQ_iPw-10Jgt2opcz9z_MRSF_cZ-34YpVUaXLGMSpNPaTnrFLhK0r2NfxS4hN6irA_8xZQ6gscEzIXnevhF2Vj3lcmp6kpoqwn9SHR2TdHsV9ULzfKW_YCy2dq-ANIQY96xFgOi2XCMJ_YjunCI6YLBdv_eIiqaE6ydeJ4WwIRKcfNcxDhmUgnsGOTzyMzZWyLiSGWG27I1lE0n53grMPEbShOF2ADyWmnPstiVyH0nxirVOTXv6LGmt5hVBcq4d8JlCHqC8HDILtbSvSOzLJkMk6iPOfc3nEtobsTRo1XfYHQsxpZan69bT5RY9I16ArwwMyE-lbpx7nanYOmgksyHKVqou_ris092M0byJs9H6brFYzIWiBsJDDTX2ayShF4O4YJAD0auvJGEBTXIbHsVAs_b0iyAOSBvt68yiCKtMf_4Gg9MZCXolCwwJaC1j8baSdBQl39-dLTecvB8Z8pRXOE-Yn5Fr0iYN-KaQL37SbznFKX3QeGpFYDuLOfI1bDpAs1xcq_NteIYTg2O15NsfbTu5PC1cO-0NtJfGVZfTpHuMvIFLvPq5CwbwtKrzly2-GEKw1iZpJtzlz7iXWbDugsJMiTHkY7boNSa0hUWtPusKVfYLdDikpD-iLesTjN7lbDGghGCMFRpjSA_ydQ8Ama0JscAlRdkAwOQy5jcWQNKwlxrL1bqifbmUFAAVWBHWOaYREgup8DaDVbptDw4JHAg6bKz1qa5c3cgjTao0pmWkbeohqpX_7ucTDEHiqo7ZRonR44zPonXqwRySHzmKW425nw7Au3xCtBb79quWFRtU3eCY6WszJeyaDDfHo19Ad7WEJVwCAEDOHQtI6m72S93TNbrnOs1xj9kkkezlUM0tHSTTarC7Q4vWaIGolfDKZ3oiWK2VsIVHnsZVZXuAAHiC7a1wNxxKNa92vNiAozW887YyfCU9ffMUcYGK-G00tBnTIs3g2BLUY35SvgljxZBcOqsAfvJHnoLju-zygyJUJp73OVbuUoObNgLiwei0ynALkR5io6Ke_aK_g2HCGel09m6vir1qNqr84FlEJkpoork7kcOYsNIDj7pfntlYjjetElH9r-1mmn-o17lZIL2LSx7lhpKPDSnn6f7yTCeQEs0GOmPwQNxpX-996rThwMGoIBgmPWKgpjecnCH5QrpZ6fQTYXjtZOsQF_dpvsB6C73MHUZf6gBstNw_LqBrxt-sTPXD1Cru3w9QJ360521rEbdRNBc21f4NUIc8ogqIfjImj7a1gJ37ut5Hnc39PBtMZJec_01AQ_SzYSwtnIaoYXKxwm51y-aWo631gxqD5hEYY1DYZ44T2I_EDBMmXKqMctF6XAGvvNB1D8GcWFT4Vvdwo"}},"csrf_token":"12d5f6191b121d87aca4aad2c5522a99"}' \
  'https://www.reddit.com/svc/shreddit/graphql'

# Response Body: {"data":{"createCaptchaToken":{"ok":true}},"operation":"CreateCaptchaToken","duration":23.70102799963206,"errors":[]}

