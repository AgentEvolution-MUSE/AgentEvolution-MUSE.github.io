export interface TraceStep { action: string; observation: string; app?: string; potential?: number; reward?: number; note?: string; status?: 'error' | 'success'; }
export const guided: TraceStep[] = [
 {action:'Get account credentials',observation:'Credentials for Venmo, SimpleNote, and Gmail returned.',app:'Venmo'},
 {action:'Log in to Venmo',observation:'Access token extracted.',app:'Venmo'},
 {action:'Inspect Venmo APIs',observation:'Transaction listing is available.',app:'Venmo'},
 {action:'Check listing parameters',observation:'Pagination options returned.',app:'Venmo'},
 {action:'Read through the first empty page',observation:'177 transactions retrieved, 20 per page.',app:'Venmo',note:'An empty page confirms that retrieval is complete.'},
 {action:'Filter amounts above $50',observation:'58 transactions totaling $6,315.',app:'Venmo',status:'success'},
 {action:'Log in to SimpleNote',observation:'Access token returned.',app:'SimpleNote'},
 {action:'List note APIs',observation:'The creation API is listed.',app:'SimpleNote'},
 {action:'Check note fields',observation:'Title and content fields identified.',app:'SimpleNote'},
 {action:'Create the requested note',observation:'The summary covers all 58 qualifying transactions.',app:'SimpleNote',status:'success'},
 {action:'Log in to Gmail',observation:'Token returned.',app:'Gmail'},
 {action:'List mail APIs',observation:'The send API is listed.',app:'Gmail'},
 {action:'Inspect send fields',observation:'Recipient, subject, and body fields identified.',app:'Gmail'},
 {action:'Send the email',observation:'The same summary is sent to the requested recipient.',app:'Gmail',status:'success'},
 {action:'Submit completion',observation:'Task submitted.',app:'Gmail'}
];
export const free: TraceStep[] = [
 ['Find credentials','Supervisor APIs listed.'],['Get credentials','Accounts returned.'],['Select password','Venmo credential selected.'],['Inspect Venmo APIs','Listing API found.'],['Inspect the listing API','Page options shown.'],['Try login','Username missing.'],['Inspect login fields','Username is required.'],['Log in','Token appears in the response.'],['Fetch records','Token rejected.'],['Log in again','Token appears in the response.'],['Retry retrieval','Token rejected.'],['Inspect Spotify login','Read API documentation.'],['Repeat login','Token appears in the response.'],['Retry retrieval','Token rejected.'],['Extract the token','Token value is ready.'],['Stop at 10 pages of 5','50 records, including a transaction of exactly $50.'],['List note APIs','Creation API listed.'],['Inspect note fields','Title and content fields identified.'],['Select password','Note credential selected.'],['Inspect note login','Read API documentation.'],['Read profile','Account identified.'],['Log in to notes','Token returned.'],['Create the requested note','Note 3084 is created from the truncated list.'],['Inspect Gmail APIs','Mail API listed. Execution ends here; no email is sent.']
].map(([action,observation],i)=>({action,observation,app:i<16?'Venmo':i<23?'SimpleNote':'Gmail',...([5,8,10,13,15,22,23].includes(i)?{status:'error' as const}:{}),...(i===15?{note:'The list is incomplete and the strict “above $50” condition is not respected.'}:{})}));
export const prefix: TraceStep[] = [
 {action:'Inspect Phone APIs',observation:'Available Phone operations are returned.',potential:.371,reward:.027},
 {action:'Retrieve credentials',observation:'Account credentials are returned.',potential:.514,reward:.326},
 {action:'Attempt Phone login',observation:'HTTP 422: username is required. The call supplies email.',potential:.313,reward:-.495,status:'error',note:'The rejected call lowers the assessed prospect of completing the task.'},
 {action:'Inspect login API',observation:'Login requires username, specified as the account phone number.',potential:.442,reward:.344,note:'Identifying the required parameter receives a positive step reward.'},
 {action:'Correct login parameters',observation:'Login with the phone number as username returns an access token.',potential:.534,reward:.188,status:'success'},
 {action:'Inspect text-message search',observation:'Documentation specifies message filters and pagination.',potential:.538,reward:.008},
 {action:'Attempt message retrieval',observation:'NameError: phone_access_token is undefined.',potential:.465,reward:-.146,status:'error'},
 {action:'Correct the token reference',observation:'The token from the login result enables retrieval of 10 matching text messages.',potential:.582,reward:.224,status:'success'},
 {action:'Inspect text-message deletion',observation:'Documentation specifies the message ID and access token.',potential:.595,reward:.023},
 {action:'Delete matching text messages',observation:'Deletion confirmations for all 10 retrieved text messages.',potential:.689,reward:.147,status:'success'},
 {action:'Inspect voice-message search',observation:'Documentation specifies voice-message filters and pagination.',potential:.705,reward:.023},
 {action:'Retrieve matching voice messages',observation:'Paginated retrieval returns 12 matching voice messages.',potential:.748,reward:.059},
 {action:'Inspect voice-message deletion',observation:'Documentation specifies the voice-message ID and access token.',potential:.755,reward:.008},
 {action:'Delete matching voice messages',observation:'Deletion confirmations for all 12 retrieved voice messages.',potential:.794,reward:.050,status:'success'},
 {action:'Submit completion',observation:'The completion call executes successfully.',potential:.794,reward:0}
];
export const experience: TraceStep[] = [
 {action:'Get credentials and log in',observation:'Access token obtained.'},
 {action:'Inspect Spotify APIs',observation:'API list returned.'},
 {action:'Inspect library parameters',observation:'Pagination fields returned.'},
 {action:'Paginate through the song library',observation:'14 songs retrieved, followed by an empty page.'},
 {action:'Fetch song details',observation:'Release dates returned for all 14 songs.',note:'Release-date experience: use detail endpoints because library listings omit the required dates.',status:'success'},
 {action:'Select a 2022 song and inspect APIs',observation:'5 matches found. Select “The Puzzle of My Heart”.'},
 {action:'Inspect play_music',observation:'The endpoint requires song_id and an access token.',note:'Playback experience: identifies play_music, which was absent from the visible portion of the truncated API listing.'},
 {action:'Play the selected song',observation:'Playback confirmed for song_id = 4.',note:'Playback experience: verify success before submitting completion.',status:'success'},
 {action:'Submit completion',observation:'Execution successful. Environment score 1.00.',status:'success'}
];
export const tool: TraceStep[] = [
 {action:'Get account credentials',observation:'Spotify password obtained.'},
 {action:'Log in to Spotify',observation:'Access token returned.'},
 {action:'Invoke the generated tool',observation:'19 downloaded-song records returned.',note:'The tool handles paginated retrieval and aggregation in a single invocation.',status:'success'},
 {action:'Compare album durations and inspect Spotify APIs',observation:'Album 5 has 952 seconds of downloaded music, exceeding the 15-minute requirement.'},
 {action:'Inspect playback parameters',observation:'play_music accepts an album ID and an access token.'},
 {action:'Play album 5',observation:'Playback confirmed for song 23.',status:'success'},
 {action:'Submit completion',observation:'Execution successful. Environment score 1.00.',status:'success'}
];
export const cases = [
 {id:'case-supervision',label:'Outcome rewards',title:'Distinguishing complete and partial task execution',summary:'The same request receives reward 1.00 when fully completed, and 0.20 when the summary is incomplete and the email is not sent.'},
 {id:'case-prefix',label:'Step-level rewards',title:'Rewarding corrections after execution errors',summary:'A rejected login receives a negative reward; identifying and correcting the API parameter receive positive rewards.'},
 {id:'case-experience',label:'Experience reuse',title:'Using past experience to find missing API information',summary:'Retrieved guidance supplies release-date lookup and playback knowledge at the steps where the agent needs it.'},
 {id:'case-tool',label:'Tool refinement',title:'Turning repeated retrieval into a reusable tool',summary:'Paired verification reduces mean interaction steps from 26.25 to 22.00; the resulting tool supplies records for offline album selection.'}
];
