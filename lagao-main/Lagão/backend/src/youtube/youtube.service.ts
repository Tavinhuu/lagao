import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class YoutubeService {
  private readonly CHANNEL_ID = 'UCwVIjBcEjZFt5Y812JgPmcA'; 

  async getLatestVideo() {
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${this.CHANNEL_ID}`;
      const response = await axios.get(rssUrl);
      
      const parser = new XMLParser();
      const jsonObj = parser.parse(response.data);

      if (!jsonObj.feed || !jsonObj.feed.entry) {
         throw new Error('Nenhum vídeo encontrado');
      }

      const latest = Array.isArray(jsonObj.feed.entry) ? jsonObj.feed.entry[0] : jsonObj.feed.entry;

      return {
        id: latest['yt:videoId'],
        title: latest.title,
        link: latest.link['@_href'],
        published: latest.published,
        description: latest['media:group']['media:description']
      };
    } catch (error) {
      console.error("Erro ao buscar YouTube:", error.message);
      // Retorna null ou erro, mas não quebra o backend
      throw new HttpException('Erro ao buscar vídeo', HttpStatus.BAD_GATEWAY);
    }
  }
}