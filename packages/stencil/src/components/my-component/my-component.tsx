import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import type { IRelativePlaylistItem, IdTag } from '@pluto-music/api';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  @Prop() playlist: IRelativePlaylistItem;

  /**
   * 跳转到 playlist 页面
   */
  @Event({
    eventName: 'to-playlist',
  })
  onToPlaylist: EventEmitter<{ id: IdTag }>;

  /**
   * 播放全部按钮
   */
  @Event({
    eventName: 'play-all',
  })
  onPlayAll: EventEmitter;

  handleToPlaylist() {
    this.onToPlaylist.emit({ id: this.playlist.id });
  }

  handlePlayAll() {
    this.onPlayAll.emit();
  }

  render() {
    return (
      <div class="playlist-card" onClick={() => this.handleToPlaylist()}>
        <div class="playlist-card__wrapper">{this.playlist.coverImgUrl && <img class="img" src={this.playlist.coverImgUrl + '?param=200y200'} alt={this.playlist.name} />}</div>
        <div class="playlist-card__name">{this.playlist.name || 'no name'}</div>
      </div>
    );
  }
}
