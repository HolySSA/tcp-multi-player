using UnityEngine;
using ProtoBuf;
using System.IO;
using System.Buffers;
using System.Collections.Generic;
using System;
using System.Text;

public class Packets : MonoBehaviour
{
    public enum PacketType { Ping, Normal, Location = 3 }
    public enum HandlerIds
    {
        Init = 0,
        LocationUpdate = 2
    }

    // ������ ���� ����ȭ
    public static void Serialize<T>(IBufferWriter<byte> writer, T data)
    {
        Serializer.Serialize(writer, data);
    }

    // ������ ���� ������ȭ
    public static T Deserialize<T>(byte[] data)
    {
        try
        {
            using (var stream = new MemoryStream(data))
            {
                return ProtoBuf.Serializer.Deserialize<T>(stream);
            }
        }
        catch (Exception ex)
        {
            Debug.LogError($"Deserialize: Failed to deserialize data. Exception: {ex}");
            throw;
        }
    }

    // json ���Ϸ� �Ľ�
    private static T DeserializeJson<T>(string jsonString)
    {
        return JsonUtility.FromJson<T>(jsonString);
    }

    // �����κ��� ������ Payload �Ľ�
    public static T ParsePayload<T>(byte[] data)
    {
        // �����κ��� ����Ʈ �迭 ���� => ���ڿ��� ��ȯ
        string jsonString = Encoding.UTF8.GetString(data);

        // InitialResponse ������ȭ
        T response = DeserializeJson<T>(jsonString);
        return response;
    }
}

[ProtoContract]
public class InitialPayload
{
    [ProtoMember(1, IsRequired = true)]
    public string deviceId { get; set; }

    [ProtoMember(2, IsRequired = true)]
    public uint playerId { get; set; }

    [ProtoMember(3, IsRequired = true)]
    public float latency { get; set; }
}

[ProtoContract]
public class CommonPacket
{
    [ProtoMember(1)]
    public uint handlerId { get; set; }

    [ProtoMember(2)]
    public string userId { get; set; }

    [ProtoMember(3)]
    public string version { get; set; }

    [ProtoMember(4)]
    public byte[] payload { get; set; }
}

[ProtoContract]
public class LocationUpdatePayload
{
    [ProtoMember(1, IsRequired = true)]
    public float x { get; set; }
    [ProtoMember(2, IsRequired = true)]
    public float y { get; set; }
}

[ProtoContract]
public class LocationUpdate
{
    [ProtoMember(1)]
    public List<UserLocation> users { get; set; }

    [ProtoContract]
    public class UserLocation
    {
        [ProtoMember(1)]
        public string id { get; set; }

        [ProtoMember(2)]
        public uint playerId { get; set; }

        [ProtoMember(3)]
        public float x { get; set; }

        [ProtoMember(4)]
        public float y { get; set; }
    }
}

[ProtoContract]
public class Response
{
    [ProtoMember(1)]
    public uint handlerId { get; set; }

    [ProtoMember(2)]
    public uint responseCode { get; set; }

    [ProtoMember(3)]
    public long timestamp { get; set; }

    [ProtoMember(4)]
    public byte[] data { get; set; }
}

[ProtoContract]
public class InitialResponse
{
    [ProtoMember(1, IsRequired = true)]
    public string userId { get; set; }

    [ProtoMember(2, IsRequired = true)]
    public float x { get; set; }

    [ProtoMember(3, IsRequired = true)]
    public float y { get; set; }
}