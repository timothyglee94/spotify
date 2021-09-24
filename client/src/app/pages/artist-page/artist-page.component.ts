import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');


    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    var artists = this.spotifyService.getArtist(this.artistId);
    var related_artists = this.spotifyService.getRelatedArtists(this.artistId);
    var tracks = this.spotifyService.getTopTracksForArtist(this.artistId);
    var album = this.spotifyService.getAlbumsForArtist(this.artistId);

    artists.then((data)=>{
        this.artist = data;
    })

    related_artists.then((data)=> {
        this.relatedArtists = data;
    })

    tracks.then((data)=> {
        this.topTracks = data;
    })

    album.then((data)=> {
        this.albums = data;
    })
  }

}