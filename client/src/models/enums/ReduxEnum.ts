/* eslint-disable no-unused-vars */
// enum used to ensure correct redux state was being altered or retrieved
enum Redux {
	ShowMovieList = "SHOWLIST",
	SetMovieList = "SETMOVIES",
	AddNomination = "ADDNOMINATION",
	RemoveNomination = "REMOVENOMINATION",
	ChangeNominationList = "CHANGENOMINATIONS",
	ShowErrorBanner = "SHOWERROR",
	ShowSuccessBanner = "SHOWSUCCESS",
	SetFullMovie = "SETFULLMOVIE",
	ShowFullMovie = "SHOWFULLMOVIE",
}

export default Redux;
